import { Vue, router } from './request/http'
import App from './App'
import 'vant/lib/index.css';
import './assets/css/reset.css';

Vue.config.productionTip = false;

/**
 * 点击处开始扩散水波纹效果
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
