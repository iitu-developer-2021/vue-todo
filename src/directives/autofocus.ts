import { app } from '@/main'

app.directive('autofocus', {
  mounted(el) {
    console.log('called autofocus', el)
    el.focus()
  },
})
