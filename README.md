# SocialSecurityCalculator

UNO-SocialSecurityCalculator

V2.0.0更新内容

1. 由Kbone框架开发
2. 增添税率设置功能


以下是开发记录

## 使用vue-cli创建项目

* 创建一个新的vue项目  
`vue create socialsecuritycalculator`
* 运行 `npm run serve`查看创建结果
* 开始编写项目代码

## 使用Kbone-cli创建项目

* 安装kbone-cli  
`npm install -g kbone-cli`
* 创建一个新的kbone项目  
`kbone init socialsecuritycalculator`
* 添加sass支持
    1. 首先在项目中安装 node-sass 和 sass-loader  
    `npm install --save-dev node-sass sass-loader`
    2. 在 webpack.config.dev.js 和 webpack.config.prod.js 配置文件中新增 sass 打包配置

    ```javascript
    // 修改前
    module: {
        ...
        {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
        },
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        // In production, we use a plugin to extract that CSS to a file, but
        // in development "style" loader enables hot editing of CSS.
        {
        test: /\.css$/,
        use: [
            require.resolve('style-loader'),
            ...
        ]
        }
        ...
    }
    
    
    // 修改后
    module: {
        ...
        {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
        },
        {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
        },
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        // In production, we use a plugin to extract that CSS to a file, but
        // in development "style" loader enables hot editing of CSS.
        {
        test: /\.css$/,
        use: [
            require.resolve('style-loader'),
            ...
        ]
        }
        ...
    }
    ```

    *注：在 less 的配置后面新增 sass 配置就可以了，红色为新增代码。*  
    3. webpack.mp.config.js 小程序打包配置文件

    ```javascript
    // 改动前
 
    module: {
        rules: [
            {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ],
            },
            ...
        ]
    }
    
    
    // 改动后
    module: {
        rules: [
            {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ],
            },
            ...
            {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
            },
            ....
        ]
    }
    ```

    注：在 less 或者 css 的加载器后面添加换行配置即可。  
* 处理max-len限制  
在文件`.eslintrc.js`中`rules`节点设置`"max-len" : ["error", {code : 300}]`或者`"max-len" : "off"`

*注意：Kbone不支持样式表中的scoped，不支持id定位样式*
*注意：Kbone不支持id定位样式*

[^要注明的文本]

* 开始编写项目代码
* 运行指令  

    ```javascript
    // 开发小程序端
    npm run mp

    // 开发 Web 端
    npm run web

    // 构建 Web 端
    npm run build
    ```

