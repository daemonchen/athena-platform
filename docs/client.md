## 客户端开发

> react + redux + webpack

### 目录结构

	├── app                           
	│   ├── actions                       - 控制器
	│   ├── components                    - 笨拙组件
	│   ├── constants                     - 常量
	│   ├── containers                    - 智能组件
	│   ├── css                         
	│   ├── index.js                      - 入口文件
	│   ├── middleware                    - 中间件
	│   ├── reducers                      - 纯函数
	│   ├── routes                        - 路由
	│   ├── store                         - 状态树
	│   └── utils                         - 公共库
	├── app.js                            - 启动脚本
	├── build
	│   ├── ace
	│   ├── css
	│   ├── font
	│   ├── index.html
	│   └── js
	├── package.json
	├── server.js
	├── webpack.config.js
	└── webpack.production.config.js

### 如何添加功能

1. 添加action
2. 添加reducer
3. 添加智能组件
4. 添加路由
	
