## Deploy 2nd Gen Function Using Gcloud CLI

```
gcloud functions deploy upload-youtube-short \
--gen2 \
--region=us-east1 \
--runtime=nodejs18 \
--source=./cloud-functions/upload-youtube-short \
--entry-point=uploadYoutubeShort \
--trigger-topic=upload-youtube-short
```
