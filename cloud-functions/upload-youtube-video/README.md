## Deploy 2nd Gen Function Using Gcloud CLI

```
gcloud functions deploy nodejs-http-function \
--gen2 \
--runtime=nodejs18 \
--region=us-east1 \
--source=./cloud-functions/upload-youtube-video \
--entry-point=uploadYoutubeVideo \
--trigger-http

```
