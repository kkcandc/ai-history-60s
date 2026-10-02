import react from "@vitejs/plugin-react";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {defineConfig} from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root,
  publicDir: path.resolve(root, "../public"),
  server: {
    host: true,
    port: 5173,
  },
});
