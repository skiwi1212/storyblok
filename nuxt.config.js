export default defineNuxtConfig({
  compatibilityDate: '2024-11-01', // Nuxt compatibility date
  devtools: { enabled: false }, // Disable devtools
  serverHandlers: [
    {
      route: '/**', // Apply middleware to all routes
      handler: '~/server/middleware/x-frame-options.js', // Path to middleware
    },
  ],
  modules: [
    ['@storyblok/nuxt', { accessToken: 'EH2Rir73inQDwCIZQPZOkgtt' }], // Storyblok module with access token
    '@nuxtjs/tailwindcss', // Tailwind CSS module
  ],
  css: ['~/assets/css/tailwind.css'], // Include Tailwind CSS file
  components: true, // Automatically register components
})
