browserify test/game.js > dist/main.js 
cat node_modules/fastclick/lib/fastclick.js dist/main.js > dist/tmp.js
uglifyjs dist/tmp.js > dist/main.min.js
rm dist/tmp.js