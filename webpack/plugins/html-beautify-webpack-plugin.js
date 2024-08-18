const beautify = require('js-beautify').html;

class HtmlBeautifyPlugin {
  constructor({ config = {}, replace = [] } = {}) {
    this.options = {
      config: Object.assign({
        indent_size: 4,
        indent_with_tabs: false,
        html: {
          end_with_newline: true,
          indent_inner_html: true,
          preserve_newlines: true,
        }
      }, config),
      replace
    };
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlBeautifyPlugin', (compilation) => {
      const HtmlWebpackPluginHooks = require('html-webpack-plugin/lib/hooks').getHtmlWebpackPluginHooks(compilation);

      if (!HtmlWebpackPluginHooks.afterTemplateExecution) {
        console.warn('HtmlBeautifyPlugin: Hook "afterTemplateExecution" not found.');
        return;
      }

      HtmlWebpackPluginHooks.afterTemplateExecution.tapAsync('HtmlBeautifyPlugin', (pluginArgs, callback) => {
        // Beautify the HTML
        let htmlContent = beautify(pluginArgs.html, this.options.config);

        // Apply replacements
        htmlContent = this.options.replace.reduce((result, item) => {
          if (typeof item === 'string' || item instanceof RegExp) {
            return result.replace(item instanceof RegExp ? item : new RegExp(item, 'gi'), '');
          } else {
            return result.replace(item.test instanceof RegExp ? item.test : new RegExp(item.test, 'gi'), item.with || '');
          }
        }, htmlContent);

        pluginArgs.html = htmlContent;

        // Continue with the process
        callback(null, pluginArgs);
      });
    });
  }
}

module.exports = HtmlBeautifyPlugin;
