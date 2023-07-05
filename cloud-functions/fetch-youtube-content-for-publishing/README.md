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
