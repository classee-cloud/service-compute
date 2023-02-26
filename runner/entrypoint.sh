#!/usr/bin/env bash
URL=$1
ORG=$2
REPONAME=$3
AUTH_TOKEN=$4
NAME=$5


#cleanup() {
#    token=$(curl -s -XPOST -H "authorization: token ${AUTH_TOKEN}" \
#        https://api.github.com/repos/${ORG}/${REPONAME}/actions/runners/registration-token |\
#        jq -r .token)
#    ./config.sh remove --token $token
#}

#token=$(curl -s -XPOST \
#    -H "authorization: token ${AUTH_TOKEN}" \
#    https://api.github.com/repos/${ORG}/${REPONAME}/actions/runners/registration-token |\
#    jq -r .token)

token=$(curl -s -XPOST \
    https://localhost:8181/runnertoken/${ORG}/${REPONAME} |\
    jq -r .token)

./config.sh --url ${URL} --token ${token} --work _work --name ${NAME} --emphemeral

./run.sh --once

#cleanup