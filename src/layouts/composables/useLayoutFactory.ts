import { ref, computed, Component } from 'vue';

export type UseLayout = ReturnType<typeof useLayoutFactory>['useLayout'];

export const useLayoutFactory = (
  LAYOUTS: Record<string, symbol>,
  defaultLayout: symbol,
  layoutComponents: Record<symbol, Component>,
) => {
  const layout = ref(defaultLayout);
  const setLayout = (newLayout: symbol) => (layout.value = newLayout);
  const currentLayoutComponent = computed(() => layoutComponents[layout.value]);

  const useLayout = () => {
    return {
      currentLayoutComponent,
      layout,
      setLayout,
      LAYOUTS,
    };
  };

  return { useLayout };
};
