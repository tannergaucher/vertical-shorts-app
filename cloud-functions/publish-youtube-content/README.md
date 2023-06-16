## Deploy 2nd Gen Function Using Gcloud CLI

```
gcloud functions deploy publish-youtube-content \
--gen2 \
--region=us-east1 \
--runtime=nodejs18 \
--source=./cloud-functions/publish-youtube-content \
--entry-point=publishYoutubeContent \
--trigger-topic=publish-youtube-content \
--timeout=540s \
--memory=256MB
```
