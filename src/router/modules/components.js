const components_files = require.context('@/components', true, /\.vue$/),
    components = {};

components_files.keys().forEach(key => {
    components[key.replace(/(\.\/|\.vue)/g, '')] = components_files(key).default
})
export default components