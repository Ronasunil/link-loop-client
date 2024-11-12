import path from "path";

import dotenv from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
dotenv.config({ path: "./config.env" });
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },

  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@api": path.resolve(__dirname, "./src/services/api"),
      "@socket": path.resolve(__dirname, "./src/services/sockets"),
      "@rtk": path.resolve(__dirname, "./src/redux-tool-kit"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@colors": path.resolve(__dirname, "./src/colors/variable.scss"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@services": path.resolve(__dirname, "./src/services"),
    },
  },
});
