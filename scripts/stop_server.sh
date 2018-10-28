#!/bin/bash
isExistApp=`pgrep httpd`
if [[ -n  \$isExistApp ]]; then
   service httpd stop
fi
isExistApp=`pgrep mysqld`
if [[ -n  \$isExistApp ]]; then
    service mysqld stop
fi

#CodeDeploy clean up its own archived deployments
#https://forums.aws.amazon.com/thread.jspa?threadID=180633
DEPLOY_INSTRUCTIONS=/opt/codedeploy-agent/deployment-root/deployment-instructions/
DEPLOY_ROOT=/opt/codedeploy-agent/deployment-root/

for d in ${DEPLOY_ROOT}*; do
[[ -d $d && "${d##*/}" != "deployment-instructions" ]] || continue
    for f in $d/*; do
    [[ -e $f && "$f" != $(cat ${DEPLOY_INSTRUCTIONS}${d##*/}_last_successful_install) ]] || continue
    if [[ $f == ${DEPLOY_ROOT}* ]]
    then
      $(rm -rf $f)
    fi  
    done
done