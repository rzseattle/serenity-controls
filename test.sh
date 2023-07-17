#!/bin/bash

stringarray=($1)
echo $1
for i in "${stringarray[@]}"
do
  :
  echo $i
done

#copy to /usr/local/bin/livesync
while inotifywait -r -e modify,create,delete $1



do
#rsync -avz $1/ $2
echo "changed"
echo ${stringarray[0]}

done