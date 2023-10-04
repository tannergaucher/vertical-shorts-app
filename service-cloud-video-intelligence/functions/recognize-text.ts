import type { PrismaClient } from "../generated";
import { cloudIntelligence, CloudIntelligenceTypes } from "../index";

export interface RecognizeTextRequest {
  projectId: string;
  slug: string;
}

type RecognizeTextParams = RecognizeTextRequest & {
  prisma: PrismaClient;
};

export async function recognizeText({
  projectId,
  slug,
  prisma,
}: RecognizeTextParams) {
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
    throw new Error(`No content for ${projectId} / ${slug}`);
  }

  const gcsUri = `gs://${content.projectId}/${content.slug}.mp4`;

  const request = {
    inputUri: gcsUri,
    features: [CloudIntelligenceTypes.Feature.TEXT_DETECTION.valueOf()],
  };

  const result = await cloudIntelligence.annotateVideo(request);

  const [operation] = result;

  console.log("Waiting for operation to complete...");

  if (operation.error) {
    throw new Error(`Operation error`);
  }

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

  return {
    message: `Created annotations for ${projectId} / ${slug}`,
    annotations: JSON.stringify(textAnnotations),
  };
}
