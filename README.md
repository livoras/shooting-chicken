Shooting Chicken!!
================

Epic HTML5 Game By Livoras

## Development
Using `beefy` which is powered by `browerify` to make modulal development easier.

    npm install -g browserify beefy uglifyJS
    beefy --live test/game.js

Then open your browser and navigate to `http://localhost:9966`, and you will see the game is running well. 

All logic codes of the game are laid in `src` folder and any change of those files will cause concatenation by `browserify` if you have your `beefy` running.

## Build
Open your git bash command line and type:

    make

All JS files will be concatenated to a `dist/main.js` file and then the file will be uglified to `dist/main.min.js` by `uglifyJS`.

## Licnese
MIT

