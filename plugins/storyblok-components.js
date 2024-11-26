import { defineNuxtPlugin } from '#app'
import AllArticles from '~/components/AllArticles.vue'
import PopularArticles from '~/components/PopularArticles.vue'


export default defineNuxtPlugin((nuxtApp) => {
  // Register both components globally
  nuxtApp.vueApp.component('AllArticles', AllArticles)
  nuxtApp.vueApp.component('PopularArticles', PopularArticles)
})
