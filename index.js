// dependencies for mnml

var fs = require("fs")
var autoprefixer = require("autoprefixer")
var postcss = require("postcss")
var atImport = require("postcss-import")
var cssvariables = require('postcss-css-variables')
var compressor = require('node-minify')
var conditionals = require('postcss-conditionals')
var customMedia = require("postcss-custom-media")
// var nesting = require('postcss-nesting')
// var extend = require('postcss-extend')
// var mixins = require('postcss-mixins')

// css to be processed
var css = fs.readFileSync("src/mnml.css", "utf8")

// process css
postcss()
  // .use(extend())
  .use(atImport())
  // .use(mixins())
  // .use(nesting())
  .use(cssvariables())
  .use(conditionals())
  .use(customMedia())
  .use(autoprefixer())
  .process(css, {
    from: "./src/mnml.css",
    to: "./mnml.css"
  })
  .then(function(css) {
    fs.writeFile("css/mnml.css", css, 'utf-8');

    // Using Sqwish for CSS
    new compressor.minify({
        type: 'sqwish',
        fileIn: './css/mnml.css',
        fileOut: './css/mnml.min.css'
    });

  });
