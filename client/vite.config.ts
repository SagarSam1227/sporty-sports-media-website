import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from "dotenv"


dotenv.config();


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0', // Set to allow connections from all IPs
  },
  define: {
    'process.env.VITE_BASE_URL':JSON.stringify(process.env.VITE_BASE_URL),
    'process.env.VITE_AUTH_URL':JSON.stringify(process.env.VITE_AUTH_URL),
    'process.env.VITE_POST_URL':JSON.stringify(process.env.VITE_POST_URL),
    'process.env.VITE_LOGIN_URL':JSON.stringify(process.env.VITE_LOGIN_URL),
    'process.env.VITE_GETPOST_URL':JSON.stringify(process.env.VITE_GETPOST_URL),
    'process.env.VITE_GET_REMAINING_POST_URL':JSON.stringify(process.env.VITE_GET_REMAINING_POST_URL),
    'process.env.VITE_GET_PROFILE_URL':JSON.stringify(process.env.VITE_GET_PROFILE_URL),
    'process.env.VITE_CLOUD_NAME':JSON.stringify(process.env.VITE_CLOUD_NAME),
    'process.env.VITE_GOOGLE_AUTH_URL':JSON.stringify(process.env.VITE_GOOGLE_AUTH_URL)
  },
})

dotenv.config();