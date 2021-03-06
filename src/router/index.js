import Vue from 'vue'
import router from 'vue-router'
import routes from './modules/pages'
import children from './modules/tabbar'
import components from './modules/components'

Vue.use(router)
// Supports both of Vue 1.0 and Vue 2.0
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