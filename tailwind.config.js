module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height:{
        '100':480,
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false,
    },
   // dark mode
   darkMode:'class'
}