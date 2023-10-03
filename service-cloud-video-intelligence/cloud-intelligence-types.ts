import { google } from "@google-cloud/video-intelligence/build/protos/protos";

export namespace CloudIntelligenceTypes {
  export type LabelAnnotation =
    google.cloud.videointelligence.v1.ILabelAnnotation;
  export enum Feature {
    LABEL_DETECTION = google.cloud.videointelligence.v1.Feature.LABEL_DETECTION,
    SPEECH_TRANSCRIPTION = google.cloud.videointelligence.v1.Feature
      .SPEECH_TRANSCRIPTION,
    TEXT_DETECTION = google.cloud.videointelligence.v1.Feature.TEXT_DETECTION,
  }
  export interface AnnotateVideoResult {
    annotationResults: {
      textAnnotations: TextAnnotation[];
    }[];
  }
  export interface TextAnnotation {
    text: string;
    segments: {
      segment: {
        startTimeOffset: {
          seconds: number;
          nanos: number;
        };
        endTimeOffset: {
          seconds: number;
          nanos: number;
        };
      };
      confidence: number;
      frames: {
        timeOffset: {
          seconds: number;
          nanos: number;
        };
        rotatedBoundingBox: {
          vertices: {
            x: number;
            y: number;
          }[];
        };
      }[];
    }[];
  }
}
