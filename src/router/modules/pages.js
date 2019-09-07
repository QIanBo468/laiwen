const pages_files = require.context('@/views/pages', true, /\.vue$/),
    pages = {};
let routes = [];

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

export default routes