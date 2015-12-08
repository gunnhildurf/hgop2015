#!/usr/bin/bash

ip="$1"

docker push gunnhildurf/tictactoe

ssh vagrant@$ip "docker kill job && docker rm job && docker pull gunnhildurf/tictactoe && docker run -p 9000:8080 -d --name job -e "NODE_ENV=production" gunnhildurf/tictactoe && exit"

