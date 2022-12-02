### 前台接入

- 引入 js 和和 css

```html
<script src="https://static.0.zone/plugin-base.js"></script>
<script src="./zoen.js"></script>
<link rel="stylesheet" type="text/css" href="./index.css" />
```

- 使用方法

```js
let site = new Zone({
      api_pash:'/api',
      company:'北京零零信安科技有限公司',
      conainer:document.getElementById('app')
});
// api_pash 后台URL地址
// company 认证公司
// conainer 是需要载入内容的dom容器
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
      /* 全局样式配置 */
      body {
        --color-bg: #d33d16;
        --color-text: #fff;
      }
    </style>
  </head>
  <body>
   
    <div id="app">
     
    </div>
  </body>
  <script>
    let site = new Zone({
      api_pash:'/api',
      company:'北京零零信安科技有限公司',
      conainer:document.getElementById('app')
    });
    site.init()
  </script>
</html>

```
