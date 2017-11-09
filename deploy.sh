#! /bin/bash

#Install Google Cloud SDK
if [ ! -d "$HOME/google-cloud-sdk/bin" ]; then rm -rf $HOME/google-cloud-sdk; curl -s https://sdk.cloud.google.com | bash; fi
# Add gcloud to $PATH
source /home/travis/google-cloud-sdk/path.bash.inc

# Auth flow
echo $GCLOUD_KEY | base64 --decode > gcloud.p12
gcloud auth activate-service-account $GCLOUD_EMAIL --key-file gcloud.p12
GOOGLE_APPLICATION_CREDENTIALS="/home/travis/gopath/src/github.com/kshitijmd/idb/gcloud.p12"
ssh-keygen -f ~/.ssh/google_compute_engine -N ""

#Deployment flow
gcloud --quiet components update kubectl
# Push to Google container registry
docker build -t gcr.io/$CLOUDSDK_CORE_PROJECT/playlistr-front-app:latest .
gcloud docker -- push gcr.io/$CLOUDSDK_CORE_PROJECT/playlistr-front-app:latest
# Deploy to the cluster
gcloud container clusters get-credentials $CLOUDSDK_DEPLOY_CLUSTER
kubectl set image deployment/$CLOUDSDK_DEPLOYMENT_LABEL $CLOUDSDK_DEPLOYMENT_LABEL=gcr.io/$CLOUDSDK_CORE_PROJECT/playlistr-front-app:latest
# Thanks to http://thylong.com/ci/2016/deploying-from-travis-to-gce/