#!/bin/sh

heroku config:set NODE_ENV=production

heroku config:set DB_USER=$DB_USER
heroku config:set DB_PWD=$DB_PWD
heroku config:set DB_PORT=$DB_PORT
heroku config:set DB_HOST=$DB_HOST
heroku config:set DB_NAME=$DB_NAME

heroku config:set LMV_CONSUMERKEY=$LMV_CONSUMERKEY
heroku config:set LMV_CONSUMERSECRET=$LMV_CONSUMERSECRET
