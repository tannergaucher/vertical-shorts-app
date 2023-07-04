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
