var path = require('path');
module.exports = {
  entry: {
    index: './public/js/index',
    main: './public/js/main'
  },
  output: {
    path: path.join(__dirname, 'public/build'),
    filename: 'bundle-[name].js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['', '.jsx', '.less', '.js', '.json']
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.less$/,
      loaders: ['style', 'css', 'less']
    }, {
      test: /\.(gif)$/,
      loader: "url-loader",
      query: {
        mimetype: ['image/gif']
      }

    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader'
    }, {
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        optional: ['runtime']
      }
    }]
  }
}
