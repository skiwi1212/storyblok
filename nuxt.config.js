export default defineNuxtConfig({
  // Compatibility date for Nuxt configuration
  compatibilityDate: '2024-11-28',

  // Runtime configuration options
  compat: {
    nuxtCompat: true, // Enables Nuxt compatibility mode
    runtimeCompiler: true, // Enables runtime compilation
  },

  // Development settings
  devtools: {
    enabled: false, // Disables development tools in production
  },

  // Server middleware configuration
  serverMiddleware: [
    {
      path: '/**', // Applies middleware to all routes
      handler: '~/server/middleware/x-frame-options.js', // Middleware handler
    },
  ],

  // Modules to be loaded
  modules: [
    [
      '@storyblok/nuxt',
      {
        accessToken: 'EH2Rir73inQDwCIZQPZOkgtt', // Storyblok access token
      },
    ],
    '@nuxtjs/tailwindcss', // TailwindCSS module
  ],

  // Global CSS files
  css: ['~/assets/css/tailwind.css'], // Path to TailwindCSS file

  // Enable automatic component imports
  components: true,

  // Runtime configuration for environment variables
  runtimeConfig: {
    // Public variables (accessible on client and server)
    public: {
      emailitApiBaseUrl: process.env.NUXT_ENV_EMAILIT_API_BASE_URL, // Base URL for EmailIt API
      emailitGeneralAdultToken: process.env.NUXT_ENV_EMAILIT_GENERAL_ADULT_TOKEN, // General adult token
    },
    // Private variables (accessible only on the server)
    private: {
      emailitApiKey: process.env.NUXT_ENV_EMAILIT_API_KEY, // Bearer token for API authentication
      smtpPassword: process.env.NUXT_ENV_EMAILIT_SMTP_PASSWORD, // SMTP password for email sending
    },
  },
});
