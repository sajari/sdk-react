var exec = require('child_process').execSync;
var version = JSON.stringify(require("./package.json").version);

// Move build js and css files out to top level
exec("mv build/static/js/*.js build/js");
exec("mv build/static/css/*.css build/css");

// Remove source maps by deleting lines matching the source map pattern
exec("sed -i '' -e '/\\/\\/# sourceMappingURL.*/d' build/js");
exec("sed -i '' -e '/\\/\\*# sourceMappingURL.*/d' build/css");

// Delete unneeded files
exec("rm -r build/static");
exec("rm build/*.json");
exec("rm build/*.html");
exec("rm build/*.ico");
exec("rm build/service-worker.js");

// Put version in file name
exec("mv build/js build/site-search-overlay." + version + ".js");
exec("mv build/css build/site-search-overlay." + version + ".css");
