export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'about-movie-nuxtjs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css',
      },
    ],
  },

  css: [
    '@/assets/scss/variables.scss',
    { src: '@/assets/scss/default', lang: 'scss' },
  ],

  plugins: [],

  components: true,

  buildModules: ['@nuxtjs/eslint-module'],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/proxy',
  ],

  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  build: {},

  styleResources: {
    scss: ['@/assets/scss/*.scss'],
  },

  env: {
    apiKey: process.env.API_KEY,
  },

  axios: {},

  proxy: {},
}
