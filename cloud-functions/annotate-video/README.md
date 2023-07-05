## Deploy 2nd Gen Function Using Gcloud CLI

```
gcloud functions deploy annotate-video \
--gen2 \
--region=us-east1 \
--runtime=nodejs18 \
--source=./cloud-functions/annotate-video \
--entry-point=annotateVideo \
--trigger-topic=annotate-video \
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
    "data": "ewogICJwcm9qZWN0SWQiOiAiY2xqcGVreWZ2MDAwMmw1MDh1bGc3ZmRiciIsCiAgInNsdWciOiAicm9zZS10dGVva2Jva2tpIgp9"
  }
}'
```

## Unencoded Test Payload

```json
{
  "projectId": "cljpekyfv0002l508ulg7fdbr",
  "slug": "rose-tteokbokki"
}
```
