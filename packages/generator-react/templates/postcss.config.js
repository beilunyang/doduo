const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-px2rem-exclude');

module.exports = {
  plugins: [
    autoprefixer({
      overrideBrowserslist: [
        'last 2 versions',
        'ie 8',
        'ie 9',
        '> 1%',
        'ios > 7',
        'android >= 4'
      ]
    }),
    px2rem({
      remUnit: 37.5,
      exclude: /weui/i
    })
  ]
};
