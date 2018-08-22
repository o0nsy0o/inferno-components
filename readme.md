#webpack-demo

```
  mode: 'development', // webpack4升级之后，增加的字段，有三个选项['development','production','none'],这个字段是必选项,配置之后会修改变量process.env.NODE_ENV。并且dev和pro有一些不同的参数选项。
  entry: './app/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'build'), // 必须使用绝对地址，输出文件夹
    filename: "bundle.js", // 打包后输出文件的文件名
    publicPath: 'home/' // 知道如何寻找资源
  }
```