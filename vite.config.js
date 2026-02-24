import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        tailwindcss(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
    ],
    esbuild: {
        loader: 'jsx',
        include: /resources\/js\/.*\.jsx?$/,
    },
    server: {
        cors: true,
    },
});
