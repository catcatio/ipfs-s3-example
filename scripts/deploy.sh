#!/bin/bash
rsync -Praz --delete --exclude=node_modules --exclude=ts-node* --exclude=.git --exclude=lib ../ ipfs-perf:~/ipfs-s3-example