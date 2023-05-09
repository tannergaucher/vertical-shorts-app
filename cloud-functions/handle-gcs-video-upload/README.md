## Deploy 2nd Gen Function Using Gcloud CLI

From project root directory, run the following:

```
gcloud functions deploy handle-gcs-video-upload \
--gen2 \
--region=us-east1 \
--runtime=nodejs18 \
--source=./cloud-functions/handle-gcs-video-upload \
--entry-point=handleGcsVideoUpload \
--trigger-topic=handle-gcs-video-upload
```
