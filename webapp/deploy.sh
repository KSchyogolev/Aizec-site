#!/bin/bash
npm run-script build && scp -r -i $1 build/* root@176.99.9.4:/root/deploy/front
