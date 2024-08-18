const path = require('path');
const ejs = require('ejs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('./webpack/plugins/html-beautify-webpack-plugin');

// Function to read and compile the EJS template
function compileEjsTemplate(templatePath) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {}, (err, str) => {
      if (err) {
        reject(err);
      } else {
        resolve(str);
      }
    });
  });
}

// Function to generate the Webpack configuration
async function generateWebpackConfig() {
  const templatePath = path.resolve(__dirname, 'src', 'index.ejs');
  let htmlContent;

  try {
    htmlContent = await compileEjsTemplate(templatePath);
  } catch (err) {
    console.error('EJS Compilation Error:', err);
    process.exit(1); // Exit if there's an error
  }

  return {
    entry: './src/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // devtool: "inline-source-map",
    // devtool: false,
    devtool: "source-map",
    plugins: [
      new HtmlWebpackPlugin({
        templateContent: htmlContent, // Use the pre-compiled template content
        minify: false, // Disable minification for development
      }),
      new HtmlBeautifyPlugin({
        config: {
            html: {
                end_with_newline: true,
                indent_size: 2,
                indent_with_tabs: false,
                indent_inner_html: true,
                preserve_newlines: true,
                unformatted: ['p', 'i', 'b', 'span']
            }
        }
    })
    ],
    resolve: {
      extensions: ['.js', '.ejs'],
    },
  };
}

// Export a function that returns a Promise resolving to the Webpack configuration
module.exports = async () => await generateWebpackConfig();
