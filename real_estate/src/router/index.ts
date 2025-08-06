/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import AboutPage from '@/pages/AboutPage.vue'
import VerificationPage from '@/pages/VerificationPage.vue'
import TextPage from '@/pages/TextPage.vue'
import Checklist from '@/pages/Checklist.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router/auto'
import { components } from 'vuetify/dist/vuetify.js'
import JudicialReview from '@/pages/JudicialReview.vue'
import SearchPage from '@/pages/SearchPage.vue'
import EnterPage from '@/pages/EnterPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: AboutPage
  },
  {
    path: '/risks',
    name: 'Risks',
    component: TextPage,
    props: (route) => ({ topic: route.query.topic, id: route.query.id})
  },
  {
    path: '/reception-transmission',
    name: 'Reception and Transmission',
    component: TextPage,
    props: (route) => ({ topic: route.query.topic })
  },
  {
    path: '/seller-verification',
    name: 'Seller Verification',
    component: VerificationPage,
    props: (route) => ({ topic: route.query.topic })
  },
  {
    path: '/real-estate-verification',
    name: 'Real Estate Verification',
    component: VerificationPage,
    props: (route) => ({ topic: route.query.topic })
  },
  {
    path: '/checklist',
    name: 'Checklist',
    component: Checklist,
    props: (route) => ({ topic: route.query.topic })
  },
  {
    path: '/judicial-practice',
    name: 'Judicial Practice',
    component: JudicialReview,
    props: (route) => ({ topic: route.query.topic, id: route.query.id })
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage,
    props: (route) => ({ query: route.query.query })
  },
  {
    path: '/enter',
    name: 'Enter',
    component: EnterPage
  },
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})



// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})



export default router