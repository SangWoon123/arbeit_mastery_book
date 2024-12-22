import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugin/vuetify'

import App from './App.vue'
import router from './router'
import { auth } from './plugin/firebase'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.provide('auth', auth)

app.mount('#app')
