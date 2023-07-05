import { v1 as videoIntelligence } from "@google-cloud/video-intelligence";
import { google } from "@google-cloud/video-intelligence/build/protos/protos";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";

import { PrismaClient } from "./generated/index.js";
import { APP_BASE_URL } from "./utils/constants";

dotenv.config();

const app = express();
app.use(json());

app.use(
  cors({
    origin: APP_BASE_URL,
  })
);

const prisma = new PrismaClient();

app.post("/annotate-video", async (req, res) => {
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

  const gcsResourceUri = `gs://${content.projectId}/${content.slug}.mp4`;

  const client = new videoIntelligence.VideoIntelligenceServiceClient();

  const request = {
    inputUri: gcsResourceUri,
    features: [google.cloud.videointelligence.v1.Feature.LABEL_DETECTION],
  };

  const [operation] = await client.annotateVideo(request);
  console.log("Waiting for operation to complete...");
  const [operationResult] = await operation.promise();

  const annotations = operationResult.annotationResults?.[0];

  const labels = annotations?.segmentLabelAnnotations;

  await prisma.content.update({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    data: {
      annotations: JSON.stringify(annotations),
      labels: JSON.stringify(labels),
    },
  });

  return res.json({ success: true });
});

const port = parseInt(process.env.PORT ?? "8080");

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
