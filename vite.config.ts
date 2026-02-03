import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'
import compression from 'vite-plugin-compression'
import { createClient } from '@supabase/supabase-js'

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

  // Fetch dynamic product routes for sitemap
  const { data: products } = await supabase.from('products').select('id');
  const dynamicRoutes = (products || []).map(p => `/products/${p.id}`);

  return {
    plugins: [
      react(),
      tailwindcss(),
      Sitemap({
        hostname: 'https://prodspark.com',
        dynamicRoutes: [
          '/products',
          '/submit',
          '/sign-in',
          '/sign-up',
          ...dynamicRoutes
        ]
      }),
      compression()
    ],
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      mock: true
    },
    ssr: {
      noExternal: ['react-helmet-async']
    }
  }
})
