import { app } from '@/main';
import Toast, { POSITION } from 'vue-toastification';
import type { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const option: PluginOptions = {
  position: POSITION.TOP_RIGHT,
};

app.use(Toast, option);
