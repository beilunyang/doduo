const { merge } = require('webpack-merge');
const createBaseConfig = require('./webpack.config.base');

const env = 'production';

const prodConfig = {
  mode: env,
};

module.exports = merge(createBaseConfig(env), prodConfig);
