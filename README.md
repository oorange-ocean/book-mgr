# 图书馆管理系统

### 概述

基于Vue3.0 + Koa2 + MongoDB的图书馆管理系统，使用Ant-design-vue 作为组件库。主要功能包括：图书查询、图书管理、图书编辑、读者管理、图书的借阅与归还以及借还日志记录等。

### 环境配置

Node.js版本：18.14.0

包管理器：npm 9.3.1、pnpm7.16.1（两者选一种即可）

前端框架：Vue3.2

后端框架：Koa2

数据访问：MongoDB4.4

组件库：Ant-design-vue4.12

### 运行配置

本系统采用前后端分离的架构设计,需分别进行安装和初始化。

**后端**

1) 从代码仓库获取最新源代码。

2) 确保满足运行环境要求

3) 进入 `book-mgr-be` 目录,运行 `npm install`安装所有依赖包

4) `cd src`  运行`node index.js`

**前端:**  

1) 进入 `book-mgr-fe` 目录

2) 运行 `npm install` 安装所有依赖包  

3) `cd src `  运行 `npm run serve` 

### 效果预览

---

* 登录界面

![登录界面](微信图片_20240415190744.png)

* 管理员-书籍管理

![](微信图片_20240415190639.png)

* 管理员-添加书籍

![信图片_2024041519101](微信图片_20240415191014.png)

* 管理员-用户管理

![信图片_2024041519065](微信图片_20240415190657.png)

* 管理员-日志列表

![信图片_2024041519070](微信图片_20240415190704.png)

* 管理员-书籍分类管理

![信图片_2024041519071](微信图片_20240415190711.png)

* 管理员-邀请码管理

![信图片_2024041519071](微信图片_20240415190719.png)

用户-图书列表

![信图片_2024041519082](微信图片_20240415190826.png)