var pkg = require('./package.json')
var path = require('path')
var webpack = require('webpack')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

let config = {
  devServer: {
    contentBase: __dirname + '/src',
  },
  context: __dirname + '/src',
  entry: {
    index: './Flipcard.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: 'Flipcard.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: pkg.babel,
          },
        ],
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerPort: 8888,
      openAnalyzer: false,
      generateStatsFile: true,
    }),
  ],
}

if (process.env.NODE_ENV === 'production') {
  // This is for a stand-alone build, ex. if you are
  // going to use it in the browser with a script tag
  config.externals = {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  }
} else {
  config.entry['dev'] = './dev.js'
  config.output['filename'] = './[name].js'
}

module.exports = config
