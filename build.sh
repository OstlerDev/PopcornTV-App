# Build.sh
#
# Script to build the different archives.
#

# Delete old files
echo 'Delete old builds'
rm -rf PopcornTV.app/
rm -rf Mac.zip
rm -rf Windows.zip
rm -rf Linux.zip

# Mac
echo '=== Packaging Mac Application ==='
electron-packager . PopcornTV --platform=darwin --arch=x64 --version=0.30.0 --icon Resources/Mac/icon.icns --ignore "/Mac.zip|Windows.zip|Linux.zip/g" --overwrite
echo 'Moving to Automator File'
cp -r Resources/Mac/PopcornTV.app .
mv PopcornTV-darwin-x64/PopcornTV.app PopcornTV.app/Contents/Resources/
echo 'Zip Mac'
zip -r Mac.zip PopcornTV.app
rm -rf PopcornTV.app
rm -rf PopcornTV-darwin-x64

# Linux
echo '=== Packaging Linux Application ==='
electron-packager . PopcornTV --platform=linux --arch=x64 --version=0.30.0 --icon Resources/Mac/icon.icns --ignore "/Mac.zip|Windows.zip|Linux.zip/g" --overwrite
echo 'Zip Linux'
zip -r Linux.zip PopcornTV-linux-x64/*
rm -rf PopcornTV-linux-x64

# Windows
echo '=== Packaging Windows Application ==='
electron-packager . PopcornTV --platform=win32 --arch=x64 --version=0.30.0 --icon Resources/Mac/icon.icns --ignore "/Mac.zip|Windows.zip|Linux.zip/g" --overwrite
echo 'Zip Windows'
zip -r Windows.zip PopcornTV-win32-x64/*
rm -rf PopcornTV-win32-x64