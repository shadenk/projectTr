// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  modules: [
    "@invictus.codes/nuxt-vuetify",
    [
      "@nuxtjs/i18n",
      {
        locales: ["en", "ar"],
        strategy: "prefix_except_default",
        defaultLocales: "en",
        detectBrowserLanguage: false,
        vueI18n: "./i18n.config.ts"
      }
    ]
  ]
});
