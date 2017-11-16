#!/bin/bash

# Link to the binary
ln -sf '/opt/${productFilename}/${executable}' '/usr/local/bin/${executable}'


# Create file association

mimeTypesFile="/etc/mime.types"
mimeType="application/org.plotify.story"
mimeTypeEntry="\napplication/org.plotify.story                   story"

if [ -f $mimeTypesFile ]; then
  if ! grep -q $mimeType $mimeTypesFile; then
    IFS='%'
    echo -e $mimeTypeEntry >> $mimeTypesFile
    unset IFS
  fi
fi
