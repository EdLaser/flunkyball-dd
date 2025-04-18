// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@nuxt/fonts",
    "nuxt-auth-utils",
  ],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  nitro: {
    compressPublicAssets: {
      brotli: true,
    }
  },

  runtimeConfig: {
    AVATAR_BUCKET_NAME: process.env.AVATAR_BUCKET_NAME,
  },

  supabase: {
    redirect: false,
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
