import { layoutFactory } from '@/layouts/helpers/layoutFactory';
import LayoutTemplate from '@/layouts/LayoutTemplate.vue';
import StandardLayout from '../StandardLayout.vue';

const LAYOUTS = {
  standard: Symbol('standard'),
};

const layoutComponents = {
  [LAYOUTS.standard]: StandardLayout,
};

const { useLayout: useBaseLayout, layoutComponent: BaseLayout } = layoutFactory(
  layoutComponents,
  LayoutTemplate,
  LAYOUTS,
  LAYOUTS.standard,
);

export { useBaseLayout, BaseLayout, LAYOUTS };
