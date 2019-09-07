const components_files = require.context('@/components', true, /\.vue$/),
    components = {};

components_files.keys().forEach(key => {
    if (components_files(key).default.name != "tabbar")
        components[key.replace(/(\.\/|\.vue)/g, '')] = components_files(key).default
})

export default components