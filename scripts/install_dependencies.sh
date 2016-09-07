#!/bin/bash
yum groupinstall -y "Web Server" "MySQL Database" "PHP Support"
yum install -y php-mysql
sudo chmod -R 4777 /var/www/html
cd /var/www/html
rm ./*
rm -r ./*
