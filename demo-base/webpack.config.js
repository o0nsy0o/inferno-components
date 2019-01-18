// 自带的库
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path')
const extractCSS = new MiniCssExtractPlugin({ 
  filename: "[name].[hash].css", 
  chunkFilename: "[id].[hash].css" 
});
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: 'development',
  entry: {
    app1: './app/index.js',
    // app2:'./app/index1.js'
  }, // 入口文件
  output: {
    path: path.resolve(__dirname, 'build'), // 必须使用绝对地址，输出文件夹
    filename: "[name].[hash].js", // 打包后输出文件的文件名
    publicPath: 'home/' // 知道如何寻找资源
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
      }
    ]
  },
  // 插件列表
  plugins: [
    // 输出的文件路径
    extractCSS
  ],
}