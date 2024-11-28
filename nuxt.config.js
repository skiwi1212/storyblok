export default defineNuxtConfig({
  compatibilityDate: '2024-11-28',  // Move this to the top

  // Runtime configuration
  compat: {
    nuxtCompat: true,
    runtimeCompiler: true,
  },

  // Development settings
  devtools: {
    enabled: false,
  },

  // Server middleware
  serverMiddleware: [
    {
      path: '/**',
      handler: '~/server/middleware/x-frame-options.js',
    },
  ],

  // Modules
  modules: [
    ['@storyblok/nuxt', { 
      accessToken: 'EH2Rir73inQDwCIZQPZOkgtt' 
    }],
    '@nuxtjs/tailwindcss',
  ],

  // Styling
  css: ['~/assets/css/tailwind.css'],

  // Component settings
  components: true,
});