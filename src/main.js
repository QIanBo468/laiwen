import { Vue, router } from './request/http'
import App from './App'
import 'vant/lib/index.css';
import './assets/css/reset.css';

Vue.config.productionTip = false;
//图形验证
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
/**
 * 自点击处开始扩散水波纹效果
 * 
 * this.$_clickAnimate(target, clientX, clientY)
 * 
 * target : 需要加动画的元素 Dom
 * clientX : 鼠标 / 手指点击的 x 坐标
 * clientY : 鼠标 / 手指点击的 y 坐标
 * click_color: 可选, 水纹颜色, 默认 rgba(0, 0, 0, 0.1)
 */
Vue.prototype.$_clickAnimate = function (target, clientX, clientY, click_color = "rgba(0, 0, 0, 0.1)") {
    // 点击动画
    const canvas = document.createElement("canvas"),
        w = target.offsetWidth,
        h = target.offsetHeight,
        x = clientX - target.getBoundingClientRect().x,
        y = clientY - target.getBoundingClientRect().y;
    let i = 0;

    canvas.width = w;
    canvas.height = h;

    Object.assign(canvas.style, {
        position: "absolute",
        top: 0,
        opacity: 1,
        transition: "0.5s opacity",
        left: 0
    });

    target.appendChild(canvas);

    let ctx = canvas.getContext("2d");
    ctx.fillStyle = click_color;

    (function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.arc(x, y, i, 0, 2 * Math.PI, false);
        ctx.fill();

        i += w / 20;
        const dim = w === h ? w * 1.412 : Math.sqrt((w * w) + (h * h))
        if (i <= dim)
            window.requestAnimationFrame(() => {
                draw();
            })
        else {
            canvas.style.opacity = 0
            setTimeout(() => {
                ctx.clearRect(0, 0, w, h);
                target.removeChild(canvas);
            }, 500)
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
