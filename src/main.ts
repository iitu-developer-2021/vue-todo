import { createApp } from 'vue';
import { router } from './router';
import { registerComponents } from '@/helpers/registerComponents';
import { loadPlugins } from '@/helpers/loadPlugins';
import './styles/style.css';
import 'virtual:svg-icons-register';
import App from './App.vue';

export const app = createApp(App);

registerComponents(app);
loadPlugins(['toast']);

app.use(router).mount('#app');
