#!/bin/bash

# Ensure list of watched files exists
watched_files=${WATCHED_FILES:-/var/log/watched-files}
touch $watched_files

# Get all files for which there is no watch
unwatched_files=$(mktemp)
cat <(find client server api -type f -regex '.*\.\(py\|js\|html\|svg\|css\)$' \
          | grep -Ev '#|node_modules') $watched_files \
    | sort | uniq -u | sed '/^$/d' > $unwatched_files

# Add new files 
cat $unwatched_files >> $watched_files

# Spawn a new watch for the files not included in the old watch.
if [ $(wc -l $unwatched_files | cut -f1 -d' ') -gt 0 ]
then
    echo New files added: $(cat $unwatched_files | head -n 10) ...
    sed 's/$/:c/' $unwatched_files | xargs inotifyd $(realpath scripts/on-change.sh) &
else
    echo No new files added in directory change
fi
