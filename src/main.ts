import { createApp } from 'vue';
import { router } from './router';
import { registerComponents } from '@/helpers/registerComponents';
import './styles/style.css';
import 'virtual:svg-icons-register';
import App from './App.vue';

const app = createApp(App);
registerComponents(app);

app.use(router).mount('#app');
