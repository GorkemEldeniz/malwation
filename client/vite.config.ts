import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@libs": path.resolve(__dirname, "src/libs"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@helpers": path.resolve(__dirname, "src/helpers"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@router": path.resolve(__dirname, "src/router/index.tsx"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@icon": path.resolve(__dirname, "src/icon/index.tsx"),
      },
    },
    build: {
      sourcemap: false,
    },
  };
});
