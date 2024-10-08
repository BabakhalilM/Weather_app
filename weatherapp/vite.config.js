import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  plugins: [react()],
   server: {
    host: '0.0.0.0',
    port: 5173
  }
});
