const webpack = require('webpack');
const { merge } = require('webpack-merge');
const createBaseConfig = require('./webpack.config.base');

const env = 'development';

const devConfig = {
  devtool: 'eval',
  mode: env,
  devServer: {
    host: '127.0.0.1',
    port: '23333',
    compress: true,
    hot: true,
    open: true,
    overlay: {
      errors: true,
      warnings: true
    },
    index: 'index.html',
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        historyApiFallback: true,
        secure: false,
        disableHostCheck: true,
        pathRewrite: { '^/api': '' }
      }
    },
    before(app) {
      app.post('/', (req, res) => {
        if (req.path.indexOf('/api') > -1) {
          return;
        }
        res.redirect(req.originalUrl);
      });
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = merge(createBaseConfig(env), devConfig);
