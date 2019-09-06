import Vue from 'vue'
import router from 'vue-router'
Vue.use(router)

/**
 * 组件1: 滑动动画组件
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
 * 
 * 组件2: 底部导航
 * <navbar></navbar>
 */


// 定义
const pages_files = require.context('@/views/pages', true, /\.vue$/),
  pages = {},
  tabbar_files = require.context('@/views/tabbar', true, /\.vue$/),
  tabbar = {},
  components_files = require.context('@/components', true, /\.vue$/),
  components = {};

let routes = [],
  children = [];

// 页面注册路由
pages_files.keys().forEach(key => {
  pages[key.replace(/(\.\/|\.vue)/g, '')] = pages_files(key).default
})
Object.keys(pages).forEach(item => {
  const file_name = item.lastIndexOf("/") === -1 ? item : item.slice(item.lastIndexOf("/") + 1),
    folder = item.split("/")[item.split("/").length - 2]
  routes.push({
    name: file_name_fun(file_name, folder),
    path: path_name_fun(file_name, folder),
    component: () => import('@/views/pages/' + item)
  })
})
function file_name_fun(file_name, folder) {
  if (file_name === "index" && folder) return folder
  else if (file_name === "index" && !folder) return "index"
  else return file_name
}
function path_name_fun(file_name, folder) {
  if (file_name === "index" && folder) return "/" + folder
  else return "/" + file_name
}

// 底部导航注册路由
tabbar_files.keys().forEach(key => {
  tabbar[key.replace(/(\.\/|\.vue)/g, '')] = tabbar_files(key).default
})
Object.keys(tabbar).forEach(item => {
  children.push({
    name: item === "index" ? "/" : item,
    path: item === "index" ? "/" : "/" + item,
    component: () => import('@/views/tabbar/' + item)
  })
})

// 注册组件
components_files.keys().forEach(key => {
  components[key.replace(/(\.\/|\.vue)/g, '')] = components_files(key).default
})
Object.keys(components).forEach(item => {
  Vue.component(item, components[item]);
})

export default new router({
  routes: [
    ...routes,
    {
      path: '/',
      component: () => import('@/components/tabbar'),
      children
    },
  ]
})

