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

### 傻瓜式操作 

1. git clone http://gitlab.qdunzi.com/wheel/vue_model.git
2. 配置 src/components/navFoots.vue 文件 (自定义组件写在 components 文件夹下会自动注册, 无需手动注册)
3. yarn | npm i
4. yarn dev | npm run dev
5. 底部导航的页面写在 src/views/tabbar 文件夹下 (首页需要命名为index.vue, 自动注册路由时 name 为 "/", path 为 "/")
6. 普通页面写在 src/views/pages 文件夹下 (命名随意, 子文件夹下命名为 index.vue 的文件, 自动注册路由时 name 为文件夹名称, path 为 "/文件路径")
7. axios 与后台交互封装在 src/request/http.js 文件

### 已集成插件：

1. vue-router
2. Vant2.0 UI 
3. Axios 
4. i18n/多语言 
5. qs 
6. core-js
7. 苹方字体

### 已集成功能：
1. 页面过渡淡入、淡出
2. 解决插值表达式闪烁的问题
3. 按钮点击波纹效果
4. axios封装
5. 上下左右切入动画效果
6. 路由自动注册
7. 底部导航自动适配

### 第三方插件推荐：

  1. 识别二维码插件: [qrcode-decoder](https://github.com/yugasun/qrcode-decoder/blob/HEAD/README.zh-CN.md)

 ```


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
