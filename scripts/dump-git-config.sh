#!/bin/bash

FILENAME=$1

git config --list |
while read line; do
    git config -f $FILENAME \
        "`echo $line | sed 's/=.\+//'`" \
        "`echo $line | sed 's/^.\+=//'`"
done