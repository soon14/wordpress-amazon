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
      $(sudo rm -rf $f)
    fi  
    done
done

#Maintaining the Repository
#https://docs.adobe.com/content/docs/en/aem/6-1/deploy/platform/storage-elements-in-aem-6.html#Maintaining%20the%20Repository
/home/ec2-user
java -jar oak-run-1.2.2.jar checkpoints /home/ec2-user/AEM/author/crx-quickstart/repository/segmentstore
java -jar oak-run-1.2.2.jar checkpoints  /home/ec2-user/AEM/author/crx-quickstart/repository/segmentstore rm-unreferenced
java -jar oak-run-1.2.2.jar compact /home/ec2-user/AEM/author/crx-quickstart/repository/segmentstore
