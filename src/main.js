import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from 'axios';
import Vant from 'vant';
import qs from 'qs';
import 'vant/lib/index.css';
import './assets/css/reset.css';

Vue.use(Vant);
Vue.config.productionTip = false;

axios.defaults.baseURL = "";
Vue.prototype.httpPath = "";
// axios.defaults.withCredentials = true
Vue.prototype.$axios = axios;
// 多语言
// import VueI18n from 'vue-i18n'

// Vue.use(VueI18n)

// 多语言实例
// const i18n = new VueI18n({
// 	locale: (function () {
// 		if (localStorage.getItem('lang')) {
// 			return localStorage.getItem('lang')
// 		}
// 		return 'zh'
// 	}()),
// 	// eslint-disable-next-line no-dupe-keys
// 	locale: 'zh',
// 	messages: {
// 		'zh': require('./assets/i18n/zh'),   // 中文语言包
// 		'en': require('./assets/i18n/en')    // 英文语言包 
// 	}
// })

/**
 * 底部导航组件
 * 启用此组件需先配置src/components/common/navFoot.vue文件
 */
// import navFoot from './components/common/navFoot.vue';
// Vue.component('navFoot', navFoot);

/**
 * 滑动动画组件
 * 
 * <translate position="top">
 *  <div></div> //需要添加动画的元素
 * </translate>
 * 
 * position可选值 :
 *   top:    从下方100px处透明度为0向上滑动到0px透明度为1停止;
 *   bottom: 从上方100px处透明度为0向下滑动到0px透明度为1停止;
 *   left:   从右方100px处透明度为0向左滑动到0px透明度为1停止;
 *   right:  从左方100px处透明度为0向右滑动到0px透明度为1停止;
 * 动画持续时间为0.5s;
 * 进入页面立即执行,所以仅用于代替页面切换效果,可以用于页面整体动画,也可分割页面每个模块各自执行动画
 */
import translate from './components/common/translate.vue';
Vue.component('translate', translate);

/**
 * 点击水波纹效果
 * 
 * this.$_clickAnimate(target, pageX, pageY)
 * 
 * target : 需要加动画的元素Dom
 * pageX : 鼠标/手指点击的x坐标
 * pageY : 鼠标/手指点击的y坐标
 */
Vue.prototype.$_clickAnimate = function (target, pageX, pageY) {
    // 点击动画
    const box = target,
        canvas = document.createElement("canvas"),
        w = box.offsetWidth,
        h = box.offsetHeight,
        x = pageX - box.getBoundingClientRect().x,
        y = pageY - box.getBoundingClientRect().y;
    let i = 5;

    canvas.width = w;
    canvas.height = h;

    Object.assign(canvas.style, {
        position: "absolute",
        top: 0,
        left: 0
    });

    box.appendChild(canvas);

    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";

    (function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.arc(x, y, i, 0, 2 * Math.PI, false);
        ctx.fill();

        i += w / 100;
        if (i < w)
            setTimeout(() => {
                draw();
            });
        else {
            ctx.clearRect(0, 0, w, h);
            box.removeChild(canvas);
        }
    })();
};

/**
 * 封装axios请求,用法:
 * 
 * this.$req("接口地址","请求方式",{ 请求参数名称: 参数值 }).then(res => {
 *      console.log(res) //请求成功返回数据
 *  }).catch(err => {
 *      console.log(err) //请求失败返回数据
 * })
 * 
 * 请求参数可选, 接口地址、请求方式(get、post、delete、put、patch)必填
 * */
Vue.prototype.$req = httpRequest;

function httpRequest(url, method, data = {}) {
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
                // let urlname = this.$router.history.current.fullPath;
                setTimeout(() => {
                    this.$router.push({
                        name: 'login',
                        // query: {
                        //     urlname
                        // }
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
/*!
 * jRaiser 2  Library
 * sizzle - v1.9.1 (2019-08-15T10:09:24+0800)
 * | Released under MIT license
 *
 * Include sizzle
 */


/* eslint-disable no-new */
new Vue({
    // i18n,
    router,
    render: h => h(App),
}).$mount('#app')


//        _==/          i     i          \==_
//      /XX/            |\___/|            \XX\
//    /XXXX\            |XXXXX|            /XXXX\
//   |XXXXXX\_         _XXXXXXX_         _/XXXXXX|
//  XXXXXXXXXXXxxxxxxxXXXXXXXXXXXxxxxxxxXXXXXXXXXXX
// |XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// |XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|
//  XXXXXX/^^^^"\XXXXXXXXXXXXXXXXXXXXX/^^^^^\XXXXXX
//   |XXX|       \XXX/^^\XXXXX/^^\XXX/       |XXX|
//     \XX\       \X/    \XXX/    \X/       /XX/
//        "\       "      \X/      "      /"
