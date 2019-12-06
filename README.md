## createVue

本项目基于 webpack4 搭建 vue 项目。

[相关文章](https://blog.csdn.net/weixin_38788347/article/details/80882432)

你可以用此项目搭建属于你的项目！！

**欢迎 star!**

**另外，我也做了一个[《从零搭建 react 的项目》](https://github.com/zxpsuper/createReact), 分享给大家**

#### 使用方法：

```
git clone https://github.com/zxpsuper/createVue.git

cd createVue

# 安装依赖
npm install

# 进入开发
npm start

# 打包
npm run build
```

### :book:更新日志

#### :sunny:2018/11/14

-   添加 vue-router

-   添加 vuex

#### :sunny:2018/12/29

-   添加 git-commit

    ```
    1. `git add file`

    2. `npm run commit`

    3. `git push`
    ```

-   添加 axios

    ```js
    // 使用方法,两者均为 promise

    this.$ajax.get(url, data, config);

    this.$ajax.post(url, data, config);
    ```

#### :sunny:2019/03/29

    加入 copy-webpack-plugin 插件，设置 static 静态资源文件夹，使其内容打包后存在于打包后的 static 文件夹中

    加入 babel-preset-es2015 与 babel-preset-stage-2 插件，解决 ...mapActions() 在 methods 中展开无效的问题

#### :sunny:2019/06/11

    加入 `workbox-webpack-plugin` 插件，实现 PWA 离线加载功能

    若不需用到，在 `webpack.prod.js` 中删除即可

#### :sunny:2019/11/07

    去除 dev 启动时多余的打印日志，还你一个干净的控制台

    解决外网无法通过 IP + 端口访问的问题，默认端口为 8080

#### :sunny:2019/12/05

-   正式加入 **webpack.dll**

**dll 的作用：**

    1. Dll 打包以后是独立存在的，只要其包含的库没有增减、升级，hash 也不会变化，因此线上的 dll 代码不需要随着版本发布频繁更新。

    2. App 部分代码修改后，只需要编译 app 部分的代码，dll 部分，只要包含的库没有增减、升级，就不需要重新打包。这样也大大提高了每次编译的速度。

    3. 假设你有多个项目，使用了相同的一些依赖库，它们就可以共用一个 dll。

**dll 文件包含的依赖：** `vue , vue-router , vuex , axios`

**dll 使用：** 开发前需执行命令 `npm run build:dll` 创建 dll 文件

#### :sunny:2019/12/06

-   移除 webpack.dll, 但保留 dll 在文件中的使用痕迹，vue-cli 已经抛弃了 dll 的用法，理由如下：

> **dll** option will be removed. Webpack 4 should provide good enough perf and the cost of maintaining DLL mode inside Vue CLI is no longer justified.
>
> dll 配置将会被移除，因为 Webpack 4 的打包性能足够好的，dll 没有在 Vue ClI 里继续维护的必要了。

-   加入 HardSourceWebpackPlugin 插件

> HardSourceWebpackPlugin 是 webpack 的插件，为模块提供中间缓存步骤。为了查看结果，您需要使用此插件运行 webpack 两次：第一次构建将花费正常的时间。第二次构建将显着加快（大概提升 90%的构建速度）

-   恢复开发时控制台的打印日志，由于 stats 设置为 errors-only 时导致热更新失效，因此恢复打印日志，解决方法暂未找到
