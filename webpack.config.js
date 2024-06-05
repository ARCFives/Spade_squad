const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/scripts/config/launcherGame.js',
  output: {
    filename: 'game.js',
    path: path.resolve(__dirname, 'src/scripts/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: './'
  }
};
