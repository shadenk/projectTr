// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: [
    'normalize.css',
    '@/assets/css/global.css',
    'bootstrap/dist/css/bootstrap.css' // Import Bootstrap CSS here
  ],
  
  modules: [
    "@invictus.codes/nuxt-vuetify",
    "@pinia-plugin-persistedstate/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHRMUpdate"]
      }
    ],
    [
      "@nuxtjs/i18n",
      {
        locales: ["en", "ar"],
        strategy: "prefix_except_default",
        defaultLocale: "en",
        detectBrowserLanguage: false,
        vueI18n: "./i18n.config.ts"
      }
    ]
  ]
});