import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   https: {
  //     key: fs.readFileSync("./dev.kinto.xyz+3-key.pem"),
  //     cert: fs.readFileSync("./dev.kinto.xyz+3.pem"),
  //   },
  //   host: "dev.kinto.xyz",
  //   port: 3000,
  // },
});
