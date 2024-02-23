import type { PrismaClient } from "../generated";
import { CloudIntelligenceTypes } from "../index";
import { cloudIntelligence } from "../index";

export interface GenerateTagsRequest {
  contentId: string;
}

type GenerateTagsParams = GenerateTagsRequest & {
  prisma: PrismaClient;
};

export async function generateTags({ contentId, prisma }: GenerateTagsParams) {
  const content = await prisma.content.findUnique({
    where: {
      id: contentId,
    },
    select: {
      id: true,
      projectId: true,
      annotations: true,
      labels: true,
    },
  });

  if (!content) {
    throw new Error("CONTENT_NOT_FOUND");
  }

  const labelAnnotations = JSON.parse(content.labels as string) as unknown as
    | CloudIntelligenceTypes.LabelAnnotation[]
    | null;

  const tags = getTagsFromLabelAnnotations(labelAnnotations);

  if (tags.length > 0) {
    return {
      tags,
      message: `${tags.length} tags already generated for ${contentId}`,
    };
  }

  try {
    const annotateVideoRequest = {
      inputUri: `gs://${content.projectId}/${content.id}.mp4`,
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
          id: contentId,
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
    throw new Error(`Error generating tags for ${contentId}`);
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
