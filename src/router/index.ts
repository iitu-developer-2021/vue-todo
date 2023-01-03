import { createRouter, createWebHistory } from "vue-router"
import { h, resolveComponent} from "vue"

const routes = [
    {
        path: '/',
        component: {
            render: () => h("<router-view />")
        }
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
