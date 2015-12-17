#!/usr/bin/bash
url="$1"
port="$2"

export ACCEPTANCE_URL=http://$ip:$port && export PATH="/usr/local/bin:$PATH" && npm install && grunt mochaTest:acceptance
