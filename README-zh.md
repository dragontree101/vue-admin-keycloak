# vueAdmin-template-keycloak

感谢 `vueAdmin-template` 项目，本项目是基于`vueAdmin-template`， 并且结合了`keycloak`进行前后端的权限认证

`keycloak`的版本是`4.1.0.Final`版本

具体的keycloak项目的搭建流程可以参考项目文档
[spring-boot-keycloak](https://github.com/dragontree101/springboot-keycloak-demo)

然后修改`keycloak`的相关地址配置和参数配置

# vueAdmin-template

> 这是一个 极简的vue admin 管理后台 它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

[线上地址](http://panjiachen.github.io/vueAdmin-template)

## Extra
如果你想要根据用户角色来动态生成侧边栏和router，你可以使用改分支[permission-control](https://github.com/PanJiaChen/vueAdmin-template/tree/permission-control)
 
 ## 相关项目
 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

 [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

写了一个系列的教程配套文章，如何从零构建后一个完整的后台项目:
 - [手摸手，带你用 vue 撸后台 系列一(基础篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
 - [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
 - [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
 - [手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板,专门针对本项目的文章,算作是一篇文档)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
 - [手摸手，带你封装一个vue component](https://segmentfault.com/a/1190000009090836)


## Build Setup

``` bash

# Clone project
git clone https://github.com/PanJiaChen/vueAdmin-template.git

# Install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Demo
![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

### Element-Ui 使用cdn教程
首先找到 `index.html` ([根目录下](https://github.com/PanJiaChen/vueAdmin-template/blob/element-ui-cdn/index.html))

引入 Element的css和js ，并且引入 vue 。因为 Element-Ui 是依赖 vue 的，所以必须在它之前引入 vue 。

之后找到 [webpack.base.conf.js](https://github.com/PanJiaChen/vueAdmin-template/blob/element-ui-cdn/build/webpack.base.conf.js) 加入 `externals` 让webpack 不打包 vue 和 element
```
externals: {
  vue: 'Vue',
  'element-ui':'ELEMENT'
}
```

之后还有一个小细节是如果你用了全局对象方式引入vue，就不需要 手动 `Vue.use(Vuex）` ，它会自动挂载，具体见 [issue](https://github.com/vuejs/vuex/issues/731)

最终你可以使用 `npm run build --report` 查看效果
如图：
![demo](https://panjiachen.github.io/images/element-cdn.png)

**[具体代码](https://github.com/PanJiaChen/vueAdmin-template/commit/746aff560932704ae821f82f10b8b2a9681d5177)**

**[对应分支](https://github.com/PanJiaChen/vueAdmin-template/tree/element-ui-cdn)**

## License
[MIT](https://github.com/PanJiaChen/vueAdmin-template/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen


