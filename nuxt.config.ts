import { Meta } from "#components";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_BASE_URL: 'https://api.themoviedb.org/3/',
      ACCESS_TOKEN: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjE1YWEzZDE5NDc1MWFjNTM5YTRiMjhlYWZjMTQ1MiIsIm5iZiI6MTc0MDM4NzU2Ni42MjUsInN1YiI6IjY3YmMzNGVlZDM2MzE2OTQ2NjQ2OTAxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TnRzoqolevxk3FS_iZWAXIe2xG7EhJFL52eGaOxEdVY"
    }
  },
  app: {
    head: {
      title: 'Shofilm',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-2.png' }, // 👈 yahan apna logo
      ],
      meta: [
        { name: 'description', content: 'Shofilm - Your Movie Database' }
      ]
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon']
})