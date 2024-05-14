import { isDevelopment } from 'std-env'

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      ],
    },
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
  ],

  css: [
    '@unocss/reset/tailwind.css',
  ],

  devtools: {
    enabled: true,
  },

  sourcemap: isDevelopment,

  vite: {
    vue: {
      script: {
        propsDestructure: true,
      },
    },
  },
})
