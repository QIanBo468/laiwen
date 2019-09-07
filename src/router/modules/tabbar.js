const tabbar_files = require.context('@/views/tabbar', true, /\.vue$/),
    tabbar = {};
let children = [];

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

export default children;