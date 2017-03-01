#!/usr/bin/env bash

# Navigate to build dir
cd build

# Move build js and css files out to top level
mv static/js/*.js js
mv static/css/*.css css

# Remove source maps by deleting lines matching the source map pattern
sed -i '' -e '/\/\/# sourceMappingURL.*/d' js
sed -i '' -e '/\/\*# sourceMappingURL.*/d' css

# Embed the css in the javascript file which will add it to the page on load
echo "var overlayStyleSheet=document.createElement('style');overlayStyleSheet.textContent='$(<css)';document.head.appendChild(overlayStyleSheet);" > temp
cat js >> temp

# Delete unneeded files
rm -r static
rm *.json
rm *.html
rm *.ico
rm js
rm css

mv temp "SiteSearch.`md5 -q temp`.js"
