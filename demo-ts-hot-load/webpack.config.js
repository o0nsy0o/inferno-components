// 自带的库
// const webpack =require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin =require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const extractCSS = new MiniCssExtractPlugin({
  filename: "[name].[hash].css",
  chunkFilename: "[id].[hash].css"
});

const CleanCommonsChunk = new CleanWebpackPlugin(['build/*.*'], {
  // 打印 log
  verbose: true,
  // 删除文件
  dry: false
});

const HtmlTemplate = new HtmlWebpackPlugin({
  template: './template/index.htm'
});

const devMode = process.env.NODE_ENV !== 'production'

const VENOR = [
  "lodash",
  "react",
  "react-dom",
  "react-router",
  "react-router-dom"
]

module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/app1/index', // 入口文件
    vendor: VENOR
  },
  output: {
    path: path.resolve(__dirname, 'build'), // 必须使用绝对地址，输出文件夹
    filename: "[name].[hash].js", // 打包后输出文件的文件名
    publicPath: 'home/' // 知道如何寻找资源
  },
  // Enable sourcemaps for debugging webpack's output.
  // devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        // js 文件才使用 babel
        test: /\.js$/,
        // 使用哪个 loader
        use: 'babel-loader',
        // 不包括路径
        exclude: /node_modules/
      },
      {
        // 图片格式正则
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            // 配置 url-loader 的可选项
            options: {
              // 限制 图片大小 10000B，小于限制会将图片转换为 base64格式
              limit: 10000,
              // 超出限制，创建的文件格式
              // build/images/[图片名].[hash].[图片格式]
              name: 'images/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?importLoaders=1',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization:{
    splitChunks:{ chunks: 'async',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }},
    runtimeChunk:false
  },
  // 插件列表
  plugins: [
    // 输出的文件路径
    extractCSS,
    CleanCommonsChunk,
    HtmlTemplate
  ],
}