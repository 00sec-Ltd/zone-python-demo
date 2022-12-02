### 前台接入

- 引入js和和css

```html
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="https://cdn.bootcss.com/lodash.js/4.17.11/lodash.min.js"></script>
<script src="./jquery.z-pager.js"></script>
<script src="./zoen.js"></script>
<link rel="stylesheet" type="text/css" href="./index.css" />
```

- 使用方法

```js
let site = new Znen('http://xxx.xxx.x.xx','北京零零信安科技有限公司',document.getElementById('app'));
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
    <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="https://cdn.bootcss.com/lodash.js/4.17.11/lodash.min.js"></script>
    <script src="./jquery.z-pager.js"></script>
    <script src="./zoen.js"></script>
    <link rel="stylesheet" type="text/css" href="./index.css" />
    <style type="text/css">
    /*
     * 全局样式
     */
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
    let site = new Znen('http://xxx.xxx.x.xx','北京零零信安科技有限公司',document.getElementById('app'));
    site.init()
  </script>
</html>

```

