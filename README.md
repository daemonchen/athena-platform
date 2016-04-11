## Athena Platform
===
> athena工具管理平台，提供athena工具数据上报接口及管理后台功能。

### 功能一览

- [x] 本地工具上报接口
- [x] 项目操作记录
- [x] 项目主页关系
- [x] 模板定制
- [x] 组件预览
- [x] 数据统计
- [x] 创建项目

###  待规划功能

- 消息通知
- 组件上传与预览整改

### 目录结构

	├── README.md
	├── client                              -客户端
	│   ├── app                             -源文件目录
	│   ├── app.js                          -启动脚本
	│   ├── build                           -开发中的编译目录
	│   ├── node_modules
	│   ├── package.json
	│   ├── server.js                       -启动脚本
	│   ├── webpack.config.js               -开发环境下配置
	│   └── webpack.production.config.js    -生产环境配置
	├── server                              -服务器api
	│   ├── README.md
	│   ├── app.js
	│   ├── config
	│   ├── controllers
	│   ├── docs
	│   ├── helpers
	│   ├── logs
	│   ├── models
	│   ├── node_modules
	│   ├── package.json
	│   ├── public
	│   ├── routes
	│   ├── static
	│   └── utils
	└── start.sh


### 涉及的代码库及安装包
	
> Express + MongoDB + React + Redux + Webpack

### 开始安装

安装依赖包：

```
git clone https://github.com/o2team/athena-platform.git
cd athena-platform
cd server/
npm install
cd ../client/
npm install
```

启动服务器：

```
node server/app.js
```

启动客户端：

```
node client/server.js
```

