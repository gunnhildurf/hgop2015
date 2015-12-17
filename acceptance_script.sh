#!/usr/bin/bash
ipII="$1"
port="$2"

export ACCEPTANCE_URL=http://$ipII:$port && export PATH="/usr/local/bin:$PATH" && npm install && grunt mochaTest:acceptance
