
> 创建完页面或自定义组件后不需要添加路由或注册, 只需要在此页面写一下页面的备注和组件的用法即可


### 目录
```
|__index.js                   // 主路由文件,
|
|__modules                    // 逻辑文件模块
|   |__components.js          // 抛出 自定义组件 数组
|   |__pages.js               // 自动注册页面文件
|   |__tabbar.js              // 自动注册底部导航文件
|
|__remark.md                  // 页面路由备注、自定义组件用法备注、路由文件结构备注, 各种备注   
```

### 页面路由备注
```
views -> pages ->
README.md: 说明文件
...
```

### 底部导航路由备注
```
views -> tabbar -> 
index: 首页
mine: 个人中心
...
```

### 组件路由备注
```
components -> 
tabbar: 底部导航一级导航父组件
navFoot: 底部导航子组件
translate: 页面进入滑动效果组件
用法:
    <translate position="top">
        <div></div> //需要添加动画的元素
    </translate>
    position可选值 :
        top:        从下方100px处透明度为0模糊向上滑动到0px透明度为1不模糊停止;
        bottom:     从上方100px处透明度为0模糊向下滑动到0px透明度为1不模糊停止;
        left:       从右方100px处透明度为0模糊向左滑动到0px透明度为1不模糊停止;
        right:      从左方100px处透明度为0模糊向右滑动到0px透明度为1不模糊停止;
        suspension: 无限上下交替, 悬浮按钮特效
    动画持续时间为0.5s;
...
```