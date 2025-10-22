import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize data from API after pinia is installed
import { usePersonalStore } from './stores/personal'
const store = usePersonalStore()
store.initializeData()

app.mount('#app')
