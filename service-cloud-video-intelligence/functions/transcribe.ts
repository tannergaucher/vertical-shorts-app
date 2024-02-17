import type { PrismaClient } from "../generated";
import { cloudIntelligence, CloudIntelligenceTypes } from "../index";

export interface TranscribeRequest {
  contentId: string;
}

type TranscribeParams = TranscribeRequest & {
  prisma: PrismaClient;
};

export async function transcribe({ contentId, prisma }: TranscribeParams) {
  const content = await prisma.content.findUnique({
    where: {
      id: contentId,
    },
    select: {
      id: true,
      projectId: true,
    },
  });

  if (!content) {
    throw new Error("CONTENT_NOT_FOUND");
  }

  const inputUri = `gs://${content.projectId}/${content.id}.mp4`;

  const videoContext = {
    speechTranscriptionConfig: {
      languageCode: "en-US",
      enableAutomaticPunctuation: true,
    },
  };

  const request = {
    inputUri,
    videoContext,
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
      id: contentId,
    },
    data: {
      transcription: JSON.stringify(operationResult),
    },
  });

  return {
    message: `Created transcription for ${contentId}`,
    transcription: JSON.stringify(operationResult),
  };
}
