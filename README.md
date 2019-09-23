```javascript

                               ii.                                         ;9ABH,
                              SA391,                                    .r9GG35&G
                              &#ii13Gh;                               i3X31i;:,rB1
                              iMs,:,i5895,                         .5G91:,:;:s1:8A
                               33::::,,;5G5,                     ,58Si,,:::,sHX;iH1
                                Sr.,:;rs13BBX35hh11511h5Shhh5S3GAXS:.,,::,,1AG3i,GG
                                .G51S511sr;;iiiishS8G89Shsrrsh59S;.,,,,,..5A85Si,h8
                               :SB9s:,............................,,,.,,,SASh53h,1G.
                            .r18S;..,,,,,,,,,,,,,,,,,,,,,,,,,,,,,....,,.1H315199,rX,
                          ;S89s,..,,,,,,,,,,,,,,,,,,,,,,,....,,.......,,,;r1ShS8,;Xi
                        i55s:.........,,,,,,,,,,,,,,,,.,,,......,.....,,....r9&5.:X1
                       59;.....,.     .,,,,,,,,,,,...        .............,..:1;.:&s
                      s8,..;53S5S3s.   .,,,,,,,.,..      i15S5h1:.........,,,..,,:99
                      93.:39s:rSGB@A;  ..,,,,.....    .SG3hhh9G&BGi..,,,,,,,,,,,,.,83
                      G5.G8  9#@@@@@X. .,,,,,,.....  iA9,.S&B###@@Mr...,,,,,,,,..,.;Xh
                      Gs.X8 S@@@@@@@B:..,,,,,,,,,,. rA1 ,A@@@@@@@@@H:........,,,,,,.iX:
                     ;9. ,8A#@@@@@@#5,.,,,,,,,,,... 9A. 8@@@@@@@@@@M;    ....,,,,,,,,S8
                     X3    iS8XAHH8s.,,,,,,,,,,...,..58hH@@@@@@@@@1s       ...,,,,,,,:Gs
                    r8,        ,,,...,,,,,,,,,,.....  ,h8XABMMHX3r.          .,,,,,,,.rX:
                   :9, .    .:,..,:;;;::,.,,,,,..          .,,.               ..,,,,,,.59
                  .Si      ,:.i8HBMMMMMB&5,....                    .            .,,,,,.sMr
                  SS       :: h@@@@@@@@@@#; .                     ...  .         ..,,,,iM5
                  91  .    ;:.,1&@@@@@@MXs.                            .          .,,:,:&S
                  hS ....  .:;,,,i3MMS1;..,..... .  .     ...                     ..,:,.99
                  ,8; ..... .,:,..,8Ms:;,,,...                                     .,::.83
                   s&: ....  .sS553B@@HX3s;,.    .,;13h.                            .:::&1
                    SXr  .  ...;s3G99XA&X88Shss11155hi.                             ,;:h&,
                     iH8:  . ..   ,;iiii;,::,,,,,.                                 .;irHA
                      ,8X5;   .     .......                                       ,;iihS8Gi
                         1831,                                                 .,;irrrrrs&@
                           ;5A8r.                                            .:;iiiiirrss1H
                             :X@H3s.......                                .,:;iii;iiiiirsrh
                              r#h:;,...,,.. .,,:;;;;;:::,...              .:;;;;;;iiiirrss1
                             ,M8 ..,....,.....,,::::::,,...         .     .,;;;iiiiiirss11h
                             8B;.,,,,,,,.,.....          .           ..   .:;;;;iirrsss111h
                            i@5,:::,,,,,,,,.... .                   . .:::;;;;;irrrss111111
                            9Bi,:,,,,......                        ..r91;;;;;iirrsss1ss1111
                                         _____     _____   _____  __    __
                                        /  _  \   |_   _| |_   _| \ \  / /
                                        | | | |     | |     | |    \ \/ /
                                        | | | |     | |     | |     }  {
                                        | |_| |_    | |     | |    / /\ \
                                        \_______|   |_|     |_|   /_/  \_\


```
# 基于 Vue-Cli3 公共模板文件

> 1. axios 与后台交互封装在 src/request/http.js 文件
> 2. 已实现自动注册页面路由自动注册自定义组件,[详情见](./src/router/remark.md)

### 傻瓜式操作 

1. git clone http://gitlab.qdunzi.com/wheel/vue_model.git
2. 配置 src/components/navFoots.vue 文件 (自定义组件写在 components 文件夹下会自动注册, 无需手动注册)
3. yarn | npm i
4. yarn dev | npm run dev
5. 底部导航的页面写在 src/views/tabbar 文件夹下 (首页需要命名为index.vue, 自动注册路由时 name 为 "/", path 为 "/")
6. 普通页面写在 src/views/pages 文件夹下 (命名随意, 子文件夹下命名为 index.vue 的文件, 自动注册路由时 name 为文件夹名称, path 为 "/文件路径")

### 已集成插件：

1. vue-router
2. Vant2.0 UI 
3. Axios 
4. i18n
5. qs 
6. core-js
7. 苹方字体
8. clipboard2 
9. vue-pdf
10. qrcode-decoder
11. sass

### 已集成功能：
1. 页面过渡淡入、淡出
2. 解决插值表达式闪烁的问题
3. 按钮点击波纹效果
4. axios封装
5. 上下左右切入动画效果
6. 路由自动注册
7. 底部导航自动适配
8. 复制粘贴
9. PDF在线预览
10. 国际化多语言
11. 二维码生成

### 第三方插件推荐：

1. 二维码解析工具: [qrcode-decoder](https://github.com/yugasun/qrcode-decoder/blob/HEAD/README.zh-CN.md)

### 多语言切换

```javascript
changeLang() {
  if (this.$i18n.locale === "zh") {
    this.$i18n.locale = "en";
    this.lang = "cn";
    localStorage.setItem("lang", "en");
  } else {
    this.$i18n.locale = "zh";
    this.lang = "rs";
    localStorage.setItem("lang", "zh");
  }
}
```
### 1、clipboard2（复制粘贴）
```javascript
<div id="app"></div>

<template id="t">
  <div class="container">
    <input type="text" v-model="message">
    <button type="button"
      v-clipboard:copy="message"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">Copy!</button>
  </div>
</template>

<script>
new Vue({
  el: '#app',
  template: '#t',
  data: function () {
    return {
      message: 'Copy These Text'
    }
  },
  methods: {
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function (e) {
      alert('Failed to copy texts')
    }
  }
})
</script>
```
### 2、clipboard2（复制粘贴）
```javascript
<div id="app"></div>

  <template id="t">
    <div class="container">
    <input type="text" v-model="message">
    <button type="button" @click="doCopy">Copy!</button>
    </div>
  </template>

  <script>
  new Vue({
    el: '#app',
    template: '#t',
    data: function () {
      return {
        message: 'Copy These Text'
      }
    },
    methods: {
      doCopy: function () {
        this.$copyText(this.message).then(function (e) {
          alert('Copied')
          console.log(e)
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })
      }
    }
  })
  </script>
```
### 3 slide-verify 图形验证码
```javascript
<div id="app"></div>
  <template id="t">
    <div class="container">
    <van-popup v-model="show" style="width:80%;padding:20px">
        <slide-verify :l="42"
                    :r="10"
                    :w="310"
                    :h="155"
                    @success="onSuccess"
                    @fail="onFail"
                    @refresh="onRefresh"
                    :slider-text="text"
                    v-if="code_show">
        </slide-verify>
    </van-popup>
    </div>
  </template>

  <script>
  new Vue({
    el: '#app',
    template: '#t',
    data: function () {
      return {
        show: false,
        msg: '',
        code_show: false,
        text: '向右滑动获取验证码',
      }
    },
    methods: {
      //成功
    onSuccess () {
      this.show = false;
      this.code_show = false;
      this.$toast.loading({
        mask: true,
        message: "正在发送中...."
      });
      this.$req("/index/Login/Icode", "post", {
        account: this.tell,
        type: 1
      }).then(res => {
        console.log("验证码", res);
        this.$toast.clear();
        if (res.code == 0) {
          this.is_time = 2;
          this.time = 60;
          var timer = setInterval(() => {
            this.time--;
            if (this.time == 0) {
              clearInterval(timer);
              this.is_time = 1;
            }
          }, 1000);
        } else {
          this.$toast({
            message: res.msg,
            duration: 1500
          });
        }
      });
    },
    //未匹配
    onFail () {
      this.$toast({
        message: "匹配失败！",
        duration: 400
      });
    },
    //刷新
    onRefresh () {
      this.$toast({
        message: "刷新成功！",
        duration: 400
      });
    },
    }
  })
  </script>

    

```