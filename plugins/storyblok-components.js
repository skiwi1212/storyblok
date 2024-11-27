import { defineNuxtPlugin } from '#app';
import AllArticles from '~/components/AllArticles.vue';
import PopularArticles from '~/components/PopularArticles.vue';
import LeadCaptureForm from '~/components/LeadCaptureForm.vue'; // Import the form component

export default defineNuxtPlugin((nuxtApp) => {
  // Register all components globally
  nuxtApp.vueApp.component('AllArticles', AllArticles);
  nuxtApp.vueApp.component('PopularArticles', PopularArticles);
  nuxtApp.vueApp.component('LeadCaptureForm', LeadCaptureForm); // Register the form component
});
