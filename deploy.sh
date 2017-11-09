#! /bin/bash
if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  gcloud --quiet components update kubectl
  # Push to Google container registry
  docker build -t gcr.io/$CLOUDSDK_CORE_PROJECT/playlistr-front-app:$TRAVIS_COMMIT .
  gcloud docker -- push gcr.io/$CLOUDSDK_CORE_PROJECT/playlistr-front-app:$TRAVIS_COMMIT
  # Deploy to the cluster
  GOOGLE_APPLICATION_CREDENTIALS="/home/travis/gopath/src/github.com/kshitijmd/idb/gcloud.p12"
  gcloud container clusters get-credentials $CLOUDSDK_DEPLOY_CLUSTER
  kubectl set image deployment/$CLOUDSDK_DEPLOY_CLUSTER $CLOUDSDK_DEPLOY_CLUSTER=gcr.io/$CLOUDSDK_CORE_PROJECT/playlistr-front-app:$TRAVIS_COMMIT
fi