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
