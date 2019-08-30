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

### 已集成插件：

1. vue-router
2. Vant2.0 UI 组件
3. Axios 插件
4. i18n 插件
5. qs 插件

### 已集成功能：
1. 全局下拉刷新
2. 页面过渡淡入、淡出
3. 解决插值表达式闪烁的问题
4. 按钮点击波纹效果


### axios 全局封装

```javascript
Vue.prototype.$get = params => {
    if (localStorage.getItem('token')) {
        axios
            .get(params.url, { params: params.data })
            .then(res => {
                console.log('请求成功', res)
                if (params.success) params.success(res)
            })
            .catch(err => {
                console.log('请求失败', err)
                if (params.fail) params.fail(err)
            })
    } else {
        setTimeout(() => {
            window.location.href = '/#/login'
        }, 1000)
    }
}

Vue.prototype.$post = params => {
    if (localStorage.getItem('token')) {
        axios
            .post(params.url, qs.stringify(params.data))
            .then(res => {
                console.log('请求成功', res)
                if (params.success) params.success(res)
            })
            .catch(err => {
                console.log('请求失败', err)
                if (params.fail) params.fail(err)
            })
    } else {
        setTimeout(() => {
            window.location.href = '/#/login'
        }, 1000)
    }
}


Vue.prototype.$req = httpRequest;
function httpRequest(url, method, data = {}, ) {
    //将method转换为小写
    method = method.toLowerCase();
    let axiosOptions = {
        url: Vue.prototype.httpPath + url,
        method: method
    };
    if (method === 'get' || method === 'delete') {
        axiosOptions.params = data;
    } else {
        axiosOptions.data = qs.stringify(data);
    }
    return new Promise((resolve, reject) => {
        axios(axiosOptions).then(res => {
                if (res.data.code == -2) {
                    Vue.prototype.$toast('未登录');
                    console.log('目标页', this.$router)
                    let urlname = this.$router.history.current.fullPath;
                    setTimeout(() => {
                        this.$router.push({
                            name: 'login',
                            query: {
                                urlname
                            }
                        })
                    }, 3000);
                } else {
                    //成功
                    resolve(res.data);
                }
            })
            .catch(err => {
                //失败
                reject(err)
            })
    })
}

this.$req("/home/address/get_address_list", "get").then(res => {
        console.log("地址", res);
        this.$toast.clear();
        if (res.code == 0) {
          this.arr = res.data;
          if (res.data.length == 0) {
            this.$toast({
              message: "暂时没有地址,快去添加吧！",
              duration: 2000
            });
          }
        }else {
          this.$toast({
            message: res.msg,
            duration: 2000
          });
        }
      });
```

### 使用 vant 的路由懒加载

```javascript
export default new Router({
    routes: [
        {
            path: '/', //首页
            name: 'Mypromotion',
            component: resolve =>
                require(['@/components/Mypromotion.vue'], resolve),
        },
        {
            path: '/upCode', //vip列表页
            name: 'upCode',
            component: resolve => require(['@/components/upCode.vue'], resolve),
        },
    ],
})
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
