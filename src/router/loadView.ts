import { defineAsyncComponent } from 'vue';

export const loadView = (view: string) => defineAsyncComponent(() => import(`@/views/${view}.vue`));
export const withNestedView = (dir: string) => (view: string) =>
  defineAsyncComponent(() => import(`@/views/${dir}/${view}.vue`));
