// var webpack = require('webpack')
console.log("webpack",webpack);
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({'window.Quill': 'quill/dist/quill.js','Quill': 'quill/dist/quill.js'})
  ],
}