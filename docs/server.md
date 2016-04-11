## 服务器接口开发

> Express + MongoDB

### 目录结构

	├── app.js                         - 运行脚本
	├── config                         - 配置文件
	│   ├── cookie.js
	│   ├── log4js.json
	│   ├── mongo.js
	│   ├── passport.js
	│   ├── template.js
	│   └── upload.js
	├── controllers                    - 控制器
	│   ├── admin                      - 给管理员后台提供接口
	│   ├── client                     - 客户端接口
	│   └── tools                      - 工具数据上报接口
	├── helpers                        - 模型辅助类
	│   ├── app.js
	│   ├── command.js
	│   ├── css.js
	│   ├── image.js
	│   ├── initApp.js
	│   ├── js.js
	│   ├── mod.js
	│   ├── page.js
	│   ├── template.js
	│   ├── user.js
	│   ├── version.js
	│   └── widget.js
	├── logs
	├── models                         - 数据模型
	│   ├── app.js
	│   ├── command.js
	│   ├── css.js
	│   ├── image.js
	│   ├── initApp.js
	│   ├── js.js
	│   ├── mod.js
	│   ├── page.js
	│   ├── template.js
	│   ├── user.js
	│   ├── version.js
	│   └── widget.js
	├── package.json
	├── public
	├── routes                        - 路由
	│   ├── admin.js
	│   ├── client.js
	│   ├── index.js
	│   └── tools.js
	├── static
	│   ├── source
	│   ├── templates
	│   ├── tmp
	│   └── unzip
	└── utils                         - 公共类
	    ├── code.js
	    ├── handler.js
	    └── mongoose-lastMod.js
