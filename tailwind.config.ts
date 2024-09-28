const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0531f7",
        secondary: "#2ebbf2",
      },
    },
  },
  plugins: [],
};
export default config;
