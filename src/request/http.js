import Vue from 'vue'
import axios from 'axios';
import router from './../router'
import qs from 'qs';
Vue.use(qs);
import Vant from 'vant';
Vue.use(Vant);
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.prototype.$axios = axios 
// axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.timeout = 10000;
const no_login_code = 4700; // 未登录返回码

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = "http://laiwen.qdunzi.com/portal";
    Vue.prototype.httpPath = "http://laiwen.qdunzi.com/portal";
    Vue.prototype.httpPathCoin = "http://laiwen.qdunzi.com/portal/digiccy";
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = "http://laiwen.qdunzi.com/portal";
    Vue.prototype.httpPath = "http://laiwen.qdunzi.com/portal";
    Vue.prototype.httpPathCoin = "http://laiwen.qdunzi.com/portal/digiccy";
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = "http://laiwen.qdunzi.com/portal";
    Vue.prototype.httpPath = "http://laiwen.qdunzi.com/portal";
    Vue.prototype.httpPathCoin = "http://laiwen.qdunzi.com/portal/digiccy";
}

Vue.prototype.httpPaths = "http://laiwen.qdunzi.com/upload";
const token = localStorage.getItem("token") || "";

if (localStorage.getItem("lang") == "en") {
    Vue.prototype.lang = 'Not Logged';
} else {
    Vue.prototype.lang = '未登录';
}

Vue.prototype.$get = params => {
    axios
        .get(params.url, { params: Object.assign({}, params.data, token ? { token } : "") })
        .then(res => {
            if (res.data.code == no_login_code) {
                Vue.prototype.$toast( Vue.prototype.lang);
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
            headers: { 'Content-Type': 'application/json' }
        };
        $axios = axios.post(params.url, params.data, config)
    } else {
        let config = {
            headers: { 'Authorization': "Bearer "+localStorage.getItem("Bearer") }
        };

        let data = {
            source: "web", version: "v1", data: params.data, module: params.module, interface: params.interface
        }

        $axios = axios.post(Vue.prototype.httpPath, data,config)
    }

    $axios
        .then(res => {
            if (res.data.code == no_login_code) {
                Vue.prototype.$toast(Vue.prototype.lang);
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

Vue.prototype.$request = params => {
    let $axios;
    if (params.upload) {
        params.data.append('token', token ? token : "")
        let config = {
            headers: { 'Content-Type': 'application/json' }
        };
        $axios = axios.post(params.url, params.data, config)
    } else {
        let config = {
            headers: { 'Authorization': "Bearer "+localStorage.getItem("Bearer") }
        };

        let data = {
            source: "web", version: "v1", data: params.data, module: params.module, interface: params.interface
        }

        $axios = axios.post(Vue.prototype.httpPathCoin, data,config)
    }

    $axios
        .then(res => {
            if (res.data.code == no_login_code) {
                Vue.prototype.$toast(Vue.prototype.lang);
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
