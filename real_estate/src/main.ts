/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
      $goto: any
  }
}

// Components
import App from '@/App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

import { createPinia } from 'pinia'


const app = createApp(App)



registerPlugins(app)
const pinia = createPinia()
app.use(pinia)
app.mount('#app')
