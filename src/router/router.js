import Vue from 'vue'
import router from 'vue-router'
Vue.use(router)

/**
 * 名称为index.vue的页面路由名称默认设为文件夹名称,并注册为底部导航,所以非底部导航的文件不要命名为index.vue
 * 
 * 路由名称备注:
 * 首页: "/"  (首页为index文件夹下index.vue文件)
 */
const files = require.context('@/view', true, /\.vue$/)

const pages = {}
files.keys().forEach(key => {
  pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})

let routes = [],
  children = [];

// function meta_return(name) {
//   switch (name) {
//     case "wrapping":
//       return true;
//     case "undefined":
//       return false;
//     default:
//       return false;
//   }
// }

Object.keys(pages).forEach(item => {
  let last = item.slice(item.indexOf("/") + 1),
    first = item.slice(0, item.indexOf("/"));
  if (last === "index")
    children.push({
      path: first === "index" ? "/" : "/" + first,
      name: first === "index" ? "/" : first,
      // meta: { no_default_animate: meta_return(last) },
      component: pages[item]
    })
  else
    routes.push({
      path: "/" + last,
      name: last,
      // meta: { no_default_animate: meta_return(last) },
      component: pages[item]
    })
})

export default new router({
  routes: [
    ...routes,
    {
      path: '/',
      component: resolve => require(['@/components/common/tabbar'], resolve),
      children
    },
  ]
})

