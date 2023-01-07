import { onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';

export const useOutsideClick = (el: Ref<HTMLElement>, callback: (...args: any) => any) => {
  const clickOutsideEventHandler = function (event: any) {
    if (!(el.value === event.target || el.value.contains(event.target))) {
      callback(event, el);
    }
  };

  onMounted(() => {
    document.body.addEventListener('click', clickOutsideEventHandler);
  });

  onUnmounted(() => {
    document.body.removeEventListener('click', clickOutsideEventHandler);
  });
};
