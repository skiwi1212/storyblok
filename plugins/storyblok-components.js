import { defineNuxtPlugin } from '#app';
import AllArticles from '~/components/AllArticles.vue';
import PopularArticles from '~/components/PopularArticles.vue';
import LeadCaptureForm from '~/components/LeadCaptureForm.vue';
import ServiceBlock from '~/components/ServiceBlock.vue';
// Add these imports using the exact names from your storyblok folder
import LandingPage from '~/storyblok/LandingPage.vue';
import Hero from '~/storyblok/Hero.vue';
import CtaSection from '~/storyblok/CtaSection.vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('AllArticles', AllArticles);
  nuxtApp.vueApp.component('PopularArticles', PopularArticles);
  nuxtApp.vueApp.component('LeadCaptureForm', LeadCaptureForm);
  // Add these with the exact technical names from Storyblok
  nuxtApp.vueApp.component('landing_page', LandingPage);
  nuxtApp.vueApp.component('hero', Hero);
  nuxtApp.vueApp.component('cta_section', CtaSection);
  nuxtApp.vueApp.component('service_block', ServiceBlock);
});