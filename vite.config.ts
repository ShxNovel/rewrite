import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "./src/index.ts",
            name: "shxRewrite",
            fileName: "shxRewrite",
            formats: ["es", "cjs"],
        },
    },
});
