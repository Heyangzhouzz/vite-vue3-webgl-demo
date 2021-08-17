import {defineConfig} from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
const {resolve} = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
