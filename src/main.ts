import { createApp } from 'vue';
import { router } from './router';
import { registerComponents } from '@/helpers/registerComponents';
import { loadPlugins, loadDirectives } from '@/helpers/loadDependency';
import './styles/style.css';
import 'virtual:svg-icons-register';
import App from './App.vue';

export const app = createApp(App);

registerComponents(app);
loadPlugins(['toast']);
loadDirectives(['autofocus']);

app.use(router).mount('#app');
