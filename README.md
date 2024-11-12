# 浏览器插件开发参考

``` 
https://juejin.cn/post/7327686547809337378
https://juejin.cn/post/7330227149177028617

```







## 插件构成

chrome 插件通常由以下几部分组成：

1. [manifest.json]( https://developer.chrome.com/docs/extensions/mv2/getstarted/ )：相当于插件的 meta 信息，包含插件的名称、版本号、图标、脚本文件名称等，这个文件是每个插件都必须提供的，其他几部分都是可选的。
2. [background script]( https://developer.chrome.com/docs/extensions/mv2/background_pages/ )：可以调用全部的 chrome 插件 API，实现跨域请求、网页截屏、弹出 chrome 通知消息等功能。相当于在一个隐藏的浏览器页面内默默运行。
3. 功能页面：包括点击插件图标弹出的页面（简称 popup）、插件的配置页面（简称 options）。
4. [content script]( https://developer.chrome.com/docs/extensions/mv2/content_scripts/ )：早期也被称为 injected script，是插件注入到页面的脚本，但是不会体现在页面 DOM 结构里。content script 可以操作 DOM，但是它和页面其他的脚本是隔离的，访问不到其他脚本定义的变量、函数等，相当于运行在单独的沙盒里。content script 可以调用有限的 chrome 插件 API，网络请求收到同源策略限制。

插件的架构可以参考[官方文档](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2Fmv2%2Farchitecture-overview%2F)。

重点说明以下几点：

1. browser action 和 page action：这俩我们可以理解为插件的按钮。browser action 会固定在 chrome 的工具栏。而 page action 可以设置特定的网页才显示图标，在地址栏的右端，如下图：







## permissions

该字段是一个字符串数组，用来声明插件需要的权限，这样才能调用某些 chrome API，常见的有：

1. tabs
2. activeTab
3. contextMenus：网页右键菜单，browser_action 右键菜单
4. cookies：操作 cookie，和用户登录态相关的功能可能会用到该权限
5. storage：插件存储，不是 localStorage
6. web_accessible_resources：网页能访问的插件内部资源，比如插件提供 SDK 给页面使用，如 ethereum 的 metamask 钱包插件。或者是修改 DOM 结构用到了插件的样式、图片、字体等资源。

permissions 中还可以声明多个 url patterns，表示插件需要访问这些 url，比如和 API 通信。



## 适配其他浏览器

目前 chrome 插件适配工作量是比较小的，因为 edge、opera 都已经切换到 chromium 内核，firefox 也支持 chrome API。

不过需要查看用到的 API 是否支持，以及 API 的入参、出参是否一致。 比如前文提到 firefox `chrome.tabs.update` 方法第一个参数不支持 selected 属性。

firefox 还支持 [browser](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FMozilla%2FAdd-ons%2FWebExtensions) API，和 chrome API 不同的是 browser API 不使用回调函数，而是返回 promise。比如：

```javascript
javascript 代码解读复制代码browser.tabs.query({ currentWindow: true }).then((res) => console.log(res));

chrome.tabs.query({ currentWindow: true }, (res) => {
  console.log(res);
});
```

可以参考各浏览器的开发文档：

- firefox: [developer.mozilla.org/en-US/docs/…](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FMozilla%2FAdd-ons%2FWebExtensions%2FBuild_a_cross_browser_extension)
- edge: [docs.microsoft.com/zh-cn/micro…](https://link.juejin.cn?target=https%3A%2F%2Fdocs.microsoft.com%2Fzh-cn%2Fmicrosoft-edge%2Fextensions-chromium%2Fdeveloper-guide%2Fport-chrome-extension)
- 360: [360安全浏览器应用开放平台](https://open.se.360.cn/open/extension_dev/overview.html)
- 搜狗: [ie.sogou.com/open/doc/](https://link.juejin.cn?target=http%3A%2F%2Fie.sogou.com%2Fopen%2Fdoc%2F)



