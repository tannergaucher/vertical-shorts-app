import type { Request, Response } from "express";

import { cloudIntelligence, CloudIntelligenceTypes, prisma } from "../index";

interface RecognizeTextRequest {
  projectId: string;
  slug: string;
}

export interface RecognizeTextResponse {
  success: boolean;
}

export async function recognizeText(
  req: Request<{}, {}, RecognizeTextRequest>,
  res: Response<RecognizeTextResponse>
): Promise<Response<RecognizeTextResponse>> {
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

  const request = {
    inputUri: gcsUri,
    features: [CloudIntelligenceTypes.Feature.TEXT_DETECTION],
  };

  const [operation] = await cloudIntelligence.annotateVideo(request);

  console.log("Waiting for operation to complete...");

  const results =
    (await operation.promise()) as CloudIntelligenceTypes.AnnotateVideoResult[];

  const textAnnotations: CloudIntelligenceTypes.TextAnnotation[] | undefined =
    results[0]?.annotationResults[0]?.textAnnotations;

  if (textAnnotations !== undefined) {
    await prisma.content.update({
      where: {
        projectId_slug: {
          projectId,
          slug,
        },
      },
      data: {
        annotations: JSON.stringify(textAnnotations),
      },
    });
  }

  return res.json({ success: true });
}
