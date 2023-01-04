import { h } from 'vue';
import { useLayoutFactory } from '../composables/useLayoutFactory';
import { Component } from 'vue';

export const layoutFactory = (
  layoutComponents: Record<symbol, Component>,
  layoutComponent: Component,
  LAYOUTS: Record<string, symbol>,
  defaultLayout: symbol,
) => {
  const { useLayout } = useLayoutFactory(LAYOUTS, defaultLayout, layoutComponents);

  const component = (props: any, { attrs, slots }: any) => {
    const options = { useLayout, ...props, ...attrs };
    return h(layoutComponent, options, slots);
  };

  return {
    layoutComponent: component,
    useLayout,
  };
};
