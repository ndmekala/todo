const path = require('path');
const { merge } = require('webpack-merge');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
};

const productionConfig = merge([
  {
    output: {
      publicPath: '/todo/',
    }
  }
])