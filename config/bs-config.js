module.exports = {
  injectionChanges: true,
  files: [
    "./src/**/*",
    "./public/**/*.html"
  ],
  watchOptions: {
    ignored: "node_modules"
  },
  server: {
    baseDir: "./public"
  }
};