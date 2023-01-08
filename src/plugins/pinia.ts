import { app } from '@/main'
import { createPinia } from 'pinia'

const pinia = createPinia()

app.use(pinia)
