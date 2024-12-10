import { defineNuxtPlugin } from '#app';
import AllArticles from '~/components/AllArticles.vue';
import PopularArticles from '~/components/PopularArticles.vue';
import LeadCaptureForm from '~/components/LeadCaptureForm.vue';
import ServiceBlock from '~/components/ServiceBlock.vue';
import SiteFooter from '~/components/SiteFooter.vue';
import LandingPage from '~/storyblok/LandingPage.vue';
import Hero from '~/storyblok/Hero.vue';
import CtaSection from '~/storyblok/CtaSection.vue';
import MenuLink from '~/components/MenuLink.vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('AllArticles', AllArticles);
  nuxtApp.vueApp.component('PopularArticles', PopularArticles);
  nuxtApp.vueApp.component('LeadCaptureForm', LeadCaptureForm);
  nuxtApp.vueApp.component('landing_page', LandingPage);
  nuxtApp.vueApp.component('hero', Hero);
  nuxtApp.vueApp.component('cta_section', CtaSection);
  nuxtApp.vueApp.component('service_block', ServiceBlock);
  nuxtApp.vueApp.component('sitefooter', SiteFooter);
  nuxtApp.vueApp.component('menu_link', MenuLink);
});