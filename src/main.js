import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import i18nPlugin from './plugins/i18n'

import './assets/style.css'

import App from './App.vue'

const app = createApp(App)
app.use(Toast)
app.mount('#app')
app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!',
  },
})
