import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use '/' locally so public/ assets resolve normally.
  // Use the repo sub-path only when building for GitHub Pages.
  base: command === 'build'
    ? '/Paws-And-Preferences_Find-Your-Favourite-Kitty/'
    : '/',
}))
