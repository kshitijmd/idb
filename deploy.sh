#! /bin/bash

#Install Google Cloud SDK
if [ ! -d "$HOME/google-cloud-sdk/bin" ]; then rm -rf $HOME/google-cloud-sdk; curl https://sdk.cloud.google.com | bash; fi
# Add gcloud to $PATH
source /home/travis/google-cloud-sdk/path.bash.inc

# Auth flow
echo $GCLOUD_KEY | base64 --decode > gcloud.p12
gcloud auth activate-service-account $GCLOUD_EMAIL --key-file gcloud.p12
ssh-keygen -f ~/.ssh/google_compute_engine -N ""

#Deployment flow
gcloud --quiet components update kubectl
# Push to Google container registry
docker build -t gcr.io/$CLOUDSDK_CORE_PROJECT/playlistr-front-app:$TRAVIS_COMMIT .
gcloud docker -- push gcr.io/$CLOUDSDK_CORE_PROJECT/playlistr-front-app:$TRAVIS_COMMIT
# Deploy to the cluster
GOOGLE_APPLICATION_CREDENTIALS="/home/travis/gopath/src/github.com/kshitijmd/idb/gcloud.p12"
gcloud container clusters get-credentials $CLOUDSDK_DEPLOY_CLUSTER
kubectl set image deployment/$CLOUDSDK_DEPLOY_CLUSTER $CLOUDSDK_DEPLOY_CLUSTER=gcr.io/$CLOUDSDK_CORE_PROJECT/playlistr-front-app:$TRAVIS_COMMIT
# Thanks to http://thylong.com/ci/2016/deploying-from-travis-to-gce/