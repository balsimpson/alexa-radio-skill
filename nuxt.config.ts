// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
          title: 'Alexa Radio',
          meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          ],
        }
      },
    css: ["~/assets/css/styles.css"],
    modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
    build : {
      transpile: ['vue-toastification']
   },
   runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    },
    private: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID
      // WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN,
      // OPENAI_KEY: process.env.OPENAI_KEY
    }
  }
})
