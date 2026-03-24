import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Replace 'crud-with-react' with your actual GitHub repository name
  base: "/crud-with-react/",
});
