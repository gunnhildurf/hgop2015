#!/usr/bin/bash

docker push gunnhildurf/tictactoe

ssh vagrant@192.168.33.15 "docker kill job && docker rm job && docker pull gunnhildurf/tictactoe && docker run -p 9000:8080 -d --name job -e "NODE_ENV=production" gunnhildurf/tictactoe && exit"

