//webpack是node写出来的 需要用node的写法

let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development', //模式:默认两种 production  development
    entry: './src/index.js' ,//入口
    output: {
        filename: 'bundle.[hash:8].js' ,//打包后的文件名
        path: path.resolve(__dirname, 'build') ,//路径必须是一个绝对路径>> 需要node的path模块
    },
    plugins:[ //数组, 放着所有webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: { //压缩html用
                removeAttributeQuotes: true ,//删除双引号
                collaspseWhitespace:true,
                hash: true
            }
        })
    ],
    module: { //模块
        //loader
        rules:[  //规则  
            // css-loader 解析@import这种语法
            // style-loader :把css插入到head的标签中
            //loader的特点: 希望单一处理某种功能, 然后就可以多个loader组合使用
            //loader的用法:字符串只用一个loader, 多个loader需要使用[]
            //loader的顺序: 默认从右往左执行
            // {test: /\.css$/,use:['style-loader','css-loader']}
            //loader还可以写成对象形式 >>>好处是可以穿参数
            {test: /\.css$/,use:[{
                loader: 'style-loader',
                options:{
                    insertAt: 'top' //插入最上面, 优先级高
                }
            }, 'css-loader']},
            //处理less文件
            {test: /\.less$/,use:[{
                loader: 'style-loader',
                options:{
                    insertAt: 'top' //插入最上面, 优先级高
                }
            }, 'css-loader', 'less-loader']}
            //安装 less  和 less-loader
            //处理sass node-sass, sass-loader包
        ]
    }

}