

git 链接远程仓库
本地git init
然后git remote add origin https://github.com/guyibang/TEST2.git指向github地址

1.css支持scss,npm install sass-loader node-sass --save-dev
配置 webpack.config.dev 里面配置加载sass-loader
这是一种简单的配置,后期有问题在修改
官网有提供支持scss的方法,是直接将scss文件编译成css,实现比较麻烦

2.需要支持react-router 4 
cnpm i react-router-dom --save-dev

结合react-router-redux处理router

npm install --save react-router-redux@next
npm install --save history

[具体配置地址] https://github.com/reacttraining/react-router/tree/master/packages/react-router-redux


3.ui使用element-react



4.安装axios,支持http请求 ,安装NProgress,加载进度条

5.安装redux,react-redux,redux-thunk,