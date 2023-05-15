## Deploy 2nd Gen Function Using Gcloud CLI

```
gcloud functions deploy check-tiktok-upload-status \
--gen2 \
--region=us-east1 \
--runtime=nodejs18 \
--source=./cloud-functions/check-tiktok-upload-status \
--entry-point=checkTikTokUploadStatus \
--trigger-topic=check-tiktok-upload-status
```
