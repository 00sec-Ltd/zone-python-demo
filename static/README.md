### 前台接入

- 引入 js 和和 css

```html
<script src="https://static.0.zone/plugin-base.js"></script>
<script src="./zoen.js"></script>
<link rel="stylesheet" type="text/css" href="./index.css" />
```

- 使用方法

```js
let site = new Znen('http://xxx.xxx.x.xx', '北京零零信安科技有限公司', document.getElementById('app'))
// 第一个参数是 URL
// 第二个参数 认证公司
// 第三个参数是需要载入内容的dom容器
site.init()
```

- 样例

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <script src="https://static.0.zone/plugin-base.js"></script>
    <script src="./zoen.js"></script>
    <link rel="stylesheet" type="text/css" href="./index.css" />
    <style type="text/css">
      /* 全局样式 */
      body {
        --color-bg: #d33d16;
        --color-text: #fff;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
  </body>
  <script>
    let site = new Znen('http://xxx.xxx.x.xx', '北京零零信安科技有限公司', document.getElementById('app'))
    site.init()
  </script>
</html>
```
