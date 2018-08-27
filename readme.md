# webpack-demo


```
  mode: 'development', // webpack4升级之后，增加的字段，有三个选项['development','production','none'],这个字段是必选项,配置之后会修改变量process.env.NODE_ENV。并且dev和pro有一些不同的参数选项。
  entry: './app/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'build'), // 必须使用绝对地址，输出文件夹
    filename: "bundle.js", // 打包后输出文件的文件名
    publicPath: 'home/' // 知道如何寻找资源
  }
```


ts-loader
```
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
```

make vander
```
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
  }
```

clean the chunk every building time 
```
const CleanCommonsChunk = new CleanWebpackPlugin(['build/bundle.*.js', 'build/manifest.*.js'], {
  // 打印 log
  verbose: true,
  // 删除文件
  dry: false
});
```

create html file with template
```
const HtmlTemplate = new HtmlWebpackPlugin({
  template: './template/index.htm'
});
```