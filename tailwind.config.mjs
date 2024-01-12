/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      dropShadow: {
        special: "1px 1px 2px rgba(0,0,0,0.5)",
      },
      fontFamily: {
        title: "Bilbo Swash Caps",
        heading: "Josefin Slab Variable",
        body: "Open Sans Variable",
      },
      colors: {
        background: "#F5F5DC",
        secondary: "#8B4513",
        menu: "#777",
        "menu-hover": "#333",
      },
    },
  },
  plugins: [],
};
