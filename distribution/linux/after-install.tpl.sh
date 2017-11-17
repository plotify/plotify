#!/bin/bash

# Link to the binary
ln -sf '/opt/${productFilename}/${executable}' '/usr/local/bin/${executable}'


# Create MIME-Type

mimeType="application/org.plotify.story"
fileExtension="story"

mimePackagesDirectory="/usr/share/mime/packages"
mimePackageFile="$mimePackagesDirectory/plotify.xml"

if [ -d $mimePackagesDirectory ]; then

  cat > $mimePackageFile <<- EndOfFile
<?xml version="1.0" encoding="UTF-8"?>
<mime-info xmlns="http://www.freedesktop.org/standards/shared-mime-info">
  <mime-type type="$mimeType">
    <comment>Plotify story</comment>
    <comment xml:lang="en">Plotify story</comment>
    <comment xml:lang="de">Plotify Geschichte</comment>
    <glob pattern="*.$fileExtension"/>
    <icon name="plotify"/>
  </mime-type>
</mime-info>
EndOfFile

  if type "update-mime-database" &> /dev/null; then
    sudo update-mime-database /usr/share/mime
  fi

fi
