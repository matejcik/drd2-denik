const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/dist/',
      filename: 'build.js'
    },
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')],
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-vueify',
            }, {
                test: /\.styl$/,
                use: ['extracted-loader'].concat(
                    ExtractTextPlugin.extract({
                        use: ['css-loader', 'stylus-loader'],
                    })
                ),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
    ],
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
    performance: {
      hints: false
    },
    devtool: '#eval-source-map',
    mode: "development",
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.mode = "production"
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
  ])
}
