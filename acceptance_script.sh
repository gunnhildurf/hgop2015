#!/usr/bin/bash

export ACCEPTANCE_URL=http://192.168.33.15:9000 && export PATH="/usr/local/bin:$PATH" && grunt mochaTest:acceptance
