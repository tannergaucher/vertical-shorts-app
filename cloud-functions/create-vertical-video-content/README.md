## Deploy 2nd Gen Function Using Gcloud CLI

From project root directory, run the following:

```
gcloud functions deploy create-vertical-video-content \
--gen2 \
--region=us-east1 \
--runtime=nodejs18 \
--source=./cloud-functions/create-vertical-video-content \
--entry-point=createVerticalVideoContent \
--trigger-topic=create-vertical-video-content
```
