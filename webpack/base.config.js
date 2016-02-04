module.exports = {
  module: {
    loaders: [{
      test: /\.ts$/,
      exclude: /(bower_components|node_modules)/,
      loader: 'ts-loader',
    }],
  },
};
