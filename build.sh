# Build.sh
#
# Script to build the different archives.
#

# Delete old files
echo 'Deleting old Mac build'
rm -rf PopcornTV.app

# Mac
echo '=== Packaging Mac Application ==='
electron-packager ./ PopcornTV --platform=darwin --arch=x64 --version=0.29.2 --icon Resources/Mac/icon.icns --ignore app/ Resources/ --overwrite
echo 'Moving to Automator File'
cp -r Resources/Mac/PopcornTV.app .
cp -r PopcornTV-darwin-x64/PopcornTV.app PopcornTV.app/Contents/Resources/
echo 'Cleaning up...'
#rm -rf PopcornTV-darwin-x64