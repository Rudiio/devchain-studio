// @type {import('tailwindcss').Config}
const {nextui} = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes:{
      "devchain-studio" : {
        extend:"dark",
        fontFamily: "var(--vscode-editor-font-family)",
        colors: {
          background: "#181818",
          foreground: "#CCCCCC",
          focus: "#F182F6",
        },
        layout: {
          disabledOpacity: "0.3",
          radius: {
            small: "4px",
            medium: "6px",
            large: "8px",
          },
          borderWidth: {
            small: "1px",
            medium: "2px",
            large: "3px",
          },
        },
        components: {
          Text: {
            styles: {
              root: {
                fontSize: "var(--vscode-editor-font-size)",
              },
            },
          },
        },
      }
    }
  })],
}

