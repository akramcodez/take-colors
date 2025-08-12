/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // VS Code theme variables
        "vscode-foreground": "var(--vscode-foreground)",
        "vscode-background": "var(--vscode-background)",
        "vscode-border": "var(--vscode-editorWidget-border)",
        "vscode-hover": "var(--vscode-editor-hoverHighlightBackground)",
        "vscode-focus": "var(--vscode-focusBorder)",
      },
      fontFamily: {
        vscode: [
          "var(--vscode-font-family)",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
  corePlugins: {
    // Disable Tailwind's preflight styles that add backgrounds
    preflight: false,
  },
};
