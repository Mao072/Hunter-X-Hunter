import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import AboutN from '../components/AboutN.vue'

const router=createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            component:HelloWorld,
        },
        {
            path:'/about',
            component:AboutN,
        }
    ]
})

export default router