import Vue from 'vue'
import router from 'vue-router'
Vue.use(router)


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

