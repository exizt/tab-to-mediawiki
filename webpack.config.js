const path = require('path');

module.exports = {
  entry: {
    'app.t2mw':'./src/app.t2mw.ts',
    'app.t2dw':'./src/app.t2dw.ts',
    'app.t2md':'./src/app.t2md.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        }
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"], // 모듈 위치
    extensions: [".ts", ".js"],
  },
};