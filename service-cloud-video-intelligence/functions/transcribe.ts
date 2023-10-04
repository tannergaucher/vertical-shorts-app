import type { PrismaClient } from "../generated";
import { cloudIntelligence, CloudIntelligenceTypes } from "../index";

export interface TranscribeRequest {
  projectId: string;
  slug: string;
}

type TranscribeParams = TranscribeRequest & {
  prisma: PrismaClient;
};

export async function transcribe({
  projectId,
  slug,
  prisma,
}: TranscribeParams) {
  const content = await prisma.content.findUnique({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    select: {
      projectId: true,
      slug: true,
    },
  });

  if (!content) {
    throw new Error("CONTENT_NOT_FOUND");
  }

  const gcsUri = `gs://${content.projectId}/${content.slug}.mp4`;

  const videoContext = {
    speechTranscriptionConfig: {
      languageCode: "en-US",
      enableAutomaticPunctuation: true,
    },
  };

  const request = {
    inputUri: gcsUri,
    videoContext: videoContext,
    features: [CloudIntelligenceTypes.Feature.SPEECH_TRANSCRIPTION.valueOf()],
  };

  const result = await cloudIntelligence.annotateVideo(request);

  const [operation] = result;

  if (operation.error) {
    throw new Error(`Operation Error`);
  }

  console.log("Waiting for operation to complete...");

  const [operationResult] = await operation.promise();

  await prisma.content.update({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    data: {
      transcription: JSON.stringify(operationResult),
    },
  });

  return {
    message: `Created transcription for ${projectId} / ${slug}`,
    transcription: JSON.stringify(operationResult),
  };
}
