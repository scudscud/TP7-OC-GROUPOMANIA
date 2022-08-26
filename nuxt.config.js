import colors from 'vuetify/es5/util/colors'
// npm run dev

export default ({
 
// export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'groupamania',
    title: 'Groupomania',
    htmlAttrs: {
      lang: 'fr',
  
    },
    router: {
      prefetchLinks: false
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=yes' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // {rel:"preconnect" ,href:"https://fonts.googleapis.com"},
      // {rel:"preconnect", href:"https://fonts.gstatic.com"},
      {rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'},

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    
   
    
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{ path: '../components/modifypost.vue', prefetch: false}],
  components: true,
  

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],
  axios:{
     baseURL:' http://localhost:5000 ',

      },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    defaultAssets: {font:{family:'Lato'}},
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  loading: {
    color: 'green',
    height: '5px'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }

})