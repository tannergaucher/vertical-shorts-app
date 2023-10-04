import type { PrismaClient } from "../generated";
import { CloudIntelligenceTypes } from "../index";
import { cloudIntelligence } from "../index";

export interface GenerateTagsRequest {
  projectId: string;
  slug: string;
}

type GenerateTagsParams = GenerateTagsRequest & {
  prisma: PrismaClient;
};

export async function generateTags({
  projectId,
  slug,
  prisma,
}: GenerateTagsParams) {
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
      annotations: true,
      labels: true,
    },
  });

  if (!content) {
    throw new Error("CONTENT_NOT_FOUND");
  }

  const contentLabels = JSON.parse(content.labels as string) as unknown as
    | CloudIntelligenceTypes.LabelAnnotation[]
    | null;

  const tags = getTagsFromLabelAnnotations(contentLabels);

  if (tags.length > 0) {
    return {
      tags: [],
      message: "No tags from content labels",
    };
  }

  try {
    const annotateVideoRequest = {
      inputUri: `gs://${content.projectId}/${content.slug}.mp4`,
      features: [CloudIntelligenceTypes.Feature.LABEL_DETECTION.valueOf()],
    };

    const result = await cloudIntelligence.annotateVideo(annotateVideoRequest);

    const [operation] = result;

    if (operation.error) {
      throw new Error(`Operation error`);
    }

    console.log("Waiting for operation to complete...");

    const [operationResult] = await operation.promise();

    const annotations = operationResult.annotationResults?.[0];

    const tags = getTagsFromLabelAnnotations(
      annotations?.segmentLabelAnnotations
    );

    if (tags.length > 0) {
      await prisma.content.update({
        where: {
          projectId_slug: {
            projectId,
            slug,
          },
        },
        data: {
          tags,
        },
      });

      return {
        tags,
        message: `Successfully generated ${tags.length} Tags`,
      };
    }

    return {
      tags: [],
      message: "No tags generated",
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Error generating tags for ${projectId} / ${slug}`);
  }
}

function getTagsFromLabelAnnotations(
  labelAnnotations?: CloudIntelligenceTypes.LabelAnnotation[] | null
) {
  if (!labelAnnotations) {
    return [];
  }

  return labelAnnotations.flatMap((labelAnnotation) =>
    labelAnnotation.entity?.description
      ? labelAnnotation.entity.description
      : []
  );
}
