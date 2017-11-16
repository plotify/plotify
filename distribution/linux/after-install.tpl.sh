#!/bin/bash

# Link to the binary
ln -sf '/opt/${productFilename}/${executable}' '/usr/local/bin/${executable}'


# Constants

mimeType="application/org.plotify.story"
fileExtension="story"


# Create MIME-Type

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
  </mime-type>
</mime-info>
EndOfFile

  if type "update-mime-database" &> /dev/null; then
    sudo update-mime-database /usr/share/mime
  fi

fi


# Create file association

mimeTypesFile="/etc/mime.types"
mimeTypeEntry="$mimeType                   $fileExtension"

if [ -f $mimeTypesFile ]; then
  if ! grep -q $mimeType $mimeTypesFile; then
    IFS='%'
    echo -e $mimeTypeEntry >> $mimeTypesFile
    unset IFS
  fi
fi


# Set default application

desktopFile="plotify.desktop"
defaultsFile="/usr/share/applications/defaults.list"
defaultEntry="$mimeType=$desktopFile"

if [ -f $defaultsFile ]; then
  if ! grep -q $mimeType $defaultsFile; then
    echo -e $defaultEntry >> $defaultsFile
  fi
fi


# Update desktop database

if type "update-desktop-database" &> /dev/null; then
  sudo update-desktop-database
fi
