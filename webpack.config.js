const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class EjsPreprocessingPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('EjsPreprocessingPlugin', (compilation, callback) => {
      const templatePath = path.resolve(__dirname, 'src', 'index.ejs');
      const outputPath = path.resolve(__dirname, 'src', 'index.compiled.ejs');

      ejs.renderFile(templatePath, {}, (err, str) => {
        if (err) {
          console.error('EJS Compilation Error:', err);
          return callback(err);
        }
        fs.writeFileSync(outputPath, str);
        callback();
      });
    });
  }
}

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new EjsPreprocessingPlugin(), // Pre-process the EJS template
    new HtmlWebpackPlugin({
      template: './src/index.compiled.ejs', // Use the pre-processed template
      minify: false,
    }),
  ],
  resolve: {
    extensions: ['.js', '.ejs'],
  },
};
