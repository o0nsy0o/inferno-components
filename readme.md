> 学习webpack我们就是在学习webpack的配置方式webpack.config.js

# context
上下文：string

基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
```
context: path.resolve(__dirname, "app")
```
默认使用当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory - 当前执行路径)。
> 注意：当不设置这个值的时候，我们的上下文会基于当前文件位置。
# entry
入口文件配置项：string、array、object
webpack会从这个入口处开始打包代码
```
entry: {
  home: "./home.js",
  about: "./about.js",
  contact: "./contact.js"
}
```
> 注意：如果这里的参数是个array或者是一个object，就有可能是多个入口，这个时候的出口也是多个的。

> 规则：每个 HTML页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。

# output
配置 output 选项可以控制 webpack 如何向硬盘写入编译文件。
> 注意，即使可以存在多个入口起点，但只指定一个输出配置。

在 webpack 中配置 output 属性的最低要求是，将它的值设置为一个对象，包括以下两点：

* filename 用于输出文件的文件名。
* 目标输出目录 path 的绝对路径。
```
const config = {
  output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
  }
};

module.exports = config;
```

> 注意:如果配置创建了多个单独的 "chunk"（例如，使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件），则应该使用占位符(substitutions)来确保每个文件具有唯一的名称。

output有几个重要的属性：
* output.path：string（绝对路径）

打包文件存放位置
```
path: path.resolve(__dirname, 'dist/assets')
```
> 注意，[hash] 在参数中被替换为编译过程(compilation)的 hash。

* output.pathinfo:boolean(true/false)

告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释。
> 注意：此选项默认值是 false，并且不应该用于生产环境(production)，但是对阅读开发环境(development)中的生成代码(generated code)极其有用。

```
pathinfo: true
```

> 注意，这些注释也会被添加至经过 tree shaking 后生成的 bundle 中。

* output.publicPath：string(静态资源地址)

对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项。如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。
```
publicPath: "https://cdn.example.com/assets/", // CDN（总是 HTTPS 协议）
publicPath: "//cdn.example.com/assets/", // CDN (协议相同)
publicPath: "/assets/", // 相对于服务(server-relative)
publicPath: "assets/", // 相对于 HTML 页面
publicPath: "../assets/", // 相对于 HTML 页面
publicPath: "", // 相对于 HTML 页面（目录相同）
```

* output.filename:string(输出文件名称)

此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。
```
filename: "bundle.js"
```
然而，当通过多个入口起点(entry point)、代码拆分(code splitting)或各种插件(plugin)创建多个 bundle，应该使用以下一种替换方式，来赋予每个 bundle 一个唯一的名称……

```
//使用入口名称：
filename: "[name].bundle.js"

//使用内部 chunk id
filename: "[id].bundle.js"

//使用每次构建过程中，唯一的 hash 生成
filename: "[name].[hash].bundle.js"

//使用基于每个 chunk 内容的 hash：
filename: "[chunkhash].bundle.js"
```

* output.library:string(导出一个库)

如果设置了，导出的包就是库，名字为output.library。
> 注意：如果你写一个库，想发布为一个文件就用此选项。

```
library: "MyLibrary"
```

* output.libraryTarget：string(导出库的格式)



# resolve
按照 webpack 官方的说法，resolve配置用来影响webpack模块解析规则。解析规则也可以称之为检索，索引规则。配置索引规则能够缩短webpack的解析时间，提升打包速度。

* resolve.extensions：array(确定的扩展名)

自动解析确定的扩展。
```
extensions: [".js", ".json"]
//能够使用户在引入模块时不带扩展：
import File from '../path/to/file'
```


# devServer
```
devServer: {
    proxy: { // 连接到后端服务器的代理url
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, 静态文件地址
    compress: true, // 允许gizp压缩代码
    historyApiFallback: true, // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。
    hot: true, //启用 webpack 的模块热替换特性
    https: false, // 是否开启https服务。
    noInfo: true, // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
    // ...
  },
```

# plugins:array

webpack 插件列表。例如，当多个 bundle 共享一些相同的依赖，CommonsChunkPlugin 有助于提取这些依赖到共享的 bundle 中，来避免重复打包。

例：
```
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    ...
  })
]
```

更复杂的例子：
```
var webpack = require('webpack')
// 导入非 webpack 默认自带插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

// 在配置中添加插件
plugins: [
  // 构建优化插件
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor-[hash].min.js',
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: false,
    }
  }),
  new ExtractTextPlugin({
    filename: 'build.min.css',
    allChunks: true,
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  // 编译时(compile time)插件
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  // webpack-dev-server 强化插件
  new DashboardPlugin(),
  new webpack.HotModuleReplacementPlugin(),
]
```

### 常用插件介绍：
1. 自动补全css3前缀——autoprefixer

它是一个自动检测兼容性给各个浏览器加个内核前缀的插件
    
实际代码：
```
:fullscreen a {
    display: flex
}
```
插件自动补充后
    
```
a {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex
}
```

使用方法：

npm包下载
```
cnpm install --save-dev autoprefixer postcss-loader
```

```
module:{
    loaders:[
    {
      test:/\.css$/,
      //在原有基础上加上一个postcss的loader就可以了
      loaders:['style-loader','css-loader','postcss-loader']
      }
      ]
  },
postcss:[autoprefixer({browsers:['last 2 versions']})]
```

2. 自动生成html插件——html-webpack-plugin

npm下载
```
cnpm install html-webpack-plugin --save-dev
```
```
//webpack.config.js
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  module.exports={
    entry:'./index.js',
    output:{
      path:__dirname+'/dist',
      filename:'bundle.js'
    }
    plugins:[
      new HtmlWebpackPlugin()
    ]
  }
```
作用:它会在dist目录下自动生成一个index.html
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```
其他配置参数:
```
{
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'admin.html',
      template:'header.html',
      inject: 'body',
      favicon:'./images/favico.ico',
      minify:true,
      hash:true,
      cache:false,
      showErrors:false,
      "chunks": {
      "head": {
        "entry": "assets/head_bundle.js",
        "css": [ "main.css" ]
      },
      xhtml:false
    })
  ]
}
```
```
--- header.html ---
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>
```
作用：
-   title: 设置title的名字   
-   filename: 设置这个html的文件名   
-   template:要使用的模块的路径  
-   inject: 把模板注入到哪个标签后 'body',   
-   favicon: 给html添加一个favicon  './images/favico.ico',   
-   minify:是否压缩  {...} | false 
-   hash:是否hash化 true false ,     
-   cache:是否缓存,   
-   showErrors:是否显示错误,  
-   chunks:目前没太明白  
-   xhtml:是否自动毕业标签 默认false  
 
 3.  提取样式插件——extract-text-webpack-plugin

把额外的数据加到编译好的文件中

```
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
                template: './src/public/index.html',
                inject: 'body'
            }),
        new ExtractTextPlugin("[name].[hash].css")
    ]
}
//这里的作用是将css放到index.html的body上面
```


4.  拷贝资源插件——copy-webpack-plugin

在webpack中拷贝文件和文件夹
```
cnpm install --save-dev copy-webpack-plugin
```

```
new CopyWebpackPlugin([{
    from: __dirname + '/src/public',
    to:__dirname + '/dist'
    拷贝public文件夹下面的文件到dist文件夹中
}]),
```

参数|作用|其他说明
---|---|---
from|定义要拷贝的源目录|from: __dirname + '/src/public'
to|定义要烤盘膛的目标目录|from: __dirname + '/dist'
toType|file 或者 dir|可选，默认是文件
force|强制覆盖先前的插件|可选 默认false
flatten|只拷贝文件不管文件夹|默认是false
ignore|忽略拷贝指定的文件|可以用模糊匹配

5. 全局挂载插件——webpack.ProvidePlugin [webpack内置插件 ]
```
new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
}))//当模块使用这些变量的时候,wepback会自动加载。
new webpack.NoErrorsPlugin(),//不显示错误插件
new webpack.optimize.DedupePlugin(),//查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
new webpack.optimize.UglifyJsPlugin(),//压缩代码
new webpack.optimize.CommonsChunkPlugin('common.js')//提取公共代码
```