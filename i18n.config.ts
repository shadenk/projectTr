export default defineI18nConfig(async () => {
    return {
      legacy: false,
      messages: {
        en: await import("./locales/en.json"),
        ar: await import("./locales/ar.json")
      }
    };
  });