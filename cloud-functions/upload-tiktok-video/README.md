## Deploy 2nd Gen Function Using Gcloud CLI

```
gcloud functions deploy upload-tiktok-video \
--gen2 \
--region=us-east1 \
--runtime=nodejs18 \
--source=./cloud-functions/upload-tiktok-video \
--entry-point=uploadTikTokVideo \
--trigger-topic=upload-tiktok-video
```

## Test Locally VIA Curl

```
curl -m 70 -X POST https://upload-tiktok-video-yzmezs2csa-ue.a.run.app \
-H "Authorization: bearer $(gcloud auth print-identity-token)" \
-H "Content-Type: application/json" \
-H "ce-id: 1234567890" \
-H "ce-specversion: 1.0" \
-H "ce-type: google.cloud.pubsub.topic.v1.messagePublished" \
-H "ce-time: 2020-08-08T00:11:44.895529672Z" \
-H "ce-source: //pubsub.googleapis.com/projects/homerice/topics/upload-tiktok-video" \
-d '{
  "message": {
    "data": "ewogICAgInNsdWciOiAic29tZS1uZXciLAogICAgInByb2plY3RJZCI6ImNsaGZ6eDNpYjAwMDhtazA4aXBmMW5hYzIiCn0="
  }
}'
```
