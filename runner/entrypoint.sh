#!/usr/bin/env bash
URL=$1
token=$2
NAME=$3

#ORG=$4
#REPONAME=$5
#AUTH_TOKEN=$5


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

#token=$(curl -s -XGET localhost:8181/runnertoken/${ORG}/${REPONAME} | jq -r .token)

echo | ./config.sh --url ${URL} --token ${token} --work _work --name ${NAME} --ephemeral
#./config.sh --url https://github.com/rajatkeshri/React-Course --token AHUOPPOYJ7AIKI7BJXUKVOTD7RLOC

./run.sh

#cleanup