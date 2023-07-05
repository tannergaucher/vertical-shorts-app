## Deploy 2nd Gen Function Using Gcloud CLI

```bash
gcloud functions deploy fetch-youtube-content-for-publishing \
--gen2 \
--region=us-east1 \
--runtime=nodejs18 \
--source=./cloud-functions/fetch-youtube-content-for-publishing \
--entry-point=fetchYoutubeContentForPublishing \
--trigger-topic=fetch-youtube-content-for-publishing \
--timeout=540s \
--memory=256MB
```

## Test function VIA CURL

```bash
curl -m 550 -X POST https://us-east1-homerice.cloudfunctions.net/annotate-video \
-H "Authorization: bearer $(gcloud auth print-identity-token)" \
-H "Content-Type: application/json" \
-H "ce-id: 1234567890" \
-H "ce-specversion: 1.0" \
-H "ce-type: google.cloud.pubsub.topic.v1.messagePublished" \
-H "ce-time: 2020-08-08T00:11:44.895529672Z" \
-H "ce-source: //pubsub.googleapis.com/projects/homerice/topics/annotate-video" \
-d '{
  "message": {
    "_comment": "data is base64 encoded string",
    "data": "ewogICJwcm9qZWN0SWQiOiAiY2xqY3doOTNxMDAwMmwxMDh0dGxwbzVnbyIsCiAgInNsdWciOiAibXktbmV3LXZlcnQubXA0Igp9"
  }
}'
```

## Unencoded Test Payload

```json
{
  "projectId": "cljcwh93q0002l108ttlpo5go",
  "slug": "my-new-vert.mp4"
}
```
