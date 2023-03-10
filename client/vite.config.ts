import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 8000,
    },
    build: {
        outDir: "../dist/client",
    },
    define: {
        "process.env": process.env,
    },
});
