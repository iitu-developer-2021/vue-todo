import { app } from '@/main';

app.directive('autofocus', {
  mounted(el) {
    el.focus();
  },
});
