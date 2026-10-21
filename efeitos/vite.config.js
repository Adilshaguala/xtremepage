import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    define: { "process.env.NODE_ENV": JSON.stringify("production") },
    build: {
        outDir: "../js/efeitos",
        emptyOutDir: true,
        cssCodeSplit: false,
        lib: {
            entry: "src/entrada.jsx",
            name: "Efeitos",
            formats: ["iife"],
            fileName: () => "efeitos.js",
        },
        rollupOptions: {
            output: {
                assetFileNames: "efeitos[extname]",   // gera sempre efeitos.css
            },
        },
    },
});