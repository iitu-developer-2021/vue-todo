import type { App } from 'vue';

const components = import.meta.globEager('@/components/base/**/*.vue');

export const registerComponents = (vueApp: App) => {
  Object.entries(components).forEach(([path, definition]) => {
    // Get name of component, based on filename
    // "./components/Fruits.vue" will become "Fruits"
    // @ts-ignore
    const componentName = path
      .split('/')
      .pop()
      .replace(/\.\w+$/, '');

    // Register component on this Vue instance
    vueApp.component(componentName, (definition as any).default);
  });
};
