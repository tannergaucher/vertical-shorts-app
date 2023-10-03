import type { Request, Response } from "express";

import { cloudIntelligence, CloudIntelligenceTypes, prisma } from "../index";

interface RecognizeTextRequest {
  projectId: string;
  slug: string;
}

export interface RecognizeTextResponse {
  success: boolean;
}

export async function transcribe(
  req: Request<{}, {}, RecognizeTextRequest>,
  res: Response<RecognizeTextResponse>
) {
  const { projectId, slug } = req.body;

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
    features: [CloudIntelligenceTypes.Feature.SPEECH_TRANSCRIPTION],
  };

  const [operation] = await cloudIntelligence.annotateVideo(request);

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

  res.json({ success: true });
}
