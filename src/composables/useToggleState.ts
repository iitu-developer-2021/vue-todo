import { ref } from 'vue';

export const useToggleState = () => {
  const show = ref(false);
  const setShowOn = () => (show.value = true);
  const setShowOff = () => (show.value = false);
  const toggleShow = () => (show.value = !show.value);
  const setShow = (newShowValue: boolean) => (show.value = newShowValue);

  return {
    show,
    setShow,
    setShowOff,
    setShowOn,
    toggleShow,
  };
};
