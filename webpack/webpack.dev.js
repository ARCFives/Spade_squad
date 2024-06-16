const path = require('path');
const {merge} = require('webpack-merge');
const commom = require('./webpack.common');
const { watchFile } = require('fs');

module.exports = merge(commom, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, '../dist'),
        open: true,
        hot: true,
        watchFiles: ['src/**/*'],
    },
    watchOptions: {
        ignored: /node_modules/,
    }
});