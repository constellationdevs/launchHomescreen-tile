const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;
const isProd = LAUNCH_COMMAND === 'prod';

console.log("Production Build: " + isProd);

const baseConfig = {
  context: __dirname,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [{
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: 'babel-loader'

      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader?name=./[name].[ext]'
      }
    ]
  },
  externals: {
    'onsenui': 'ons'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  }

};


const devConfig = {
  devtool: 'eval',
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public/index.html'),
    filename: 'index.html'
  })]
};



const mainConfig =  {
  ...baseConfig,
  ...devConfig
};

module.exports = mainConfig;