import Vue from 'vue'
import axios from 'axios';
import router from './../router'
import qs from 'qs';
import Vant from 'vant';
Vue.use(Vant);
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
// axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.timeout = 10000;
const no_login_code = -2; // 未登录返回码

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = "";
    Vue.prototype.httpPath = "";
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = "";
    Vue.prototype.httpPath = "";
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = "";
    Vue.prototype.httpPath = "";
}
const token = localStorage.getItem("token") || "";

Vue.prototype.$get = params => {
    axios
        .get(params.url, { params: Object.assign({}, params.data, token ? { token } : "") })
        .then(res => {
            if (res.data.code == no_login_code) {
                Vue.prototype.$toast('未登录');
                if (token) localStorage.removeItem("token");
                setTimeout(() => {
                    router.replace('login')
                }, 1500);
            } else {
                console.log("请求成功", res);
                if (params.success)
                    params.success(res);
            }
        })
        .catch(err => {
            console.log("请求失败", err);
            if (params.fail)
                params.fail(err);
        })
}

Vue.prototype.$post = params => {
    let $axios;
    if (params.upload) {
        params.data.append('token', token ? token : "")
        let config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };
        $axios = axios.post(params.url, params.data, config)
    } else {
        let data = qs.stringify(Object.assign({}, params.data, token ? { token } : {}))
        $axios = axios.post(params.url, data)
    }

    $axios
        .then(res => {
            if (res.data.code == no_login_code) {
                Vue.prototype.$toast('未登录');
                if (token) localStorage.removeItem("token");
                setTimeout(() => {
                    router.replace('login')
                }, 1500);
            } else {
                console.log("请求成功", res);
                if (params.success)
                    params.success(res);
            }
        })
        .catch(err => {
            console.log("请求失败", err);
            if (params.fail)
                params.fail(err);
        })
}

export { Vue, router }
