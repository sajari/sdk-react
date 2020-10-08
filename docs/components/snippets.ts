export default {
  code: {
    go: `package main

import (
  "log"
  "net/http"
)

// Example comment but a really long one to show how the Code component handles wrapping of the content
func main() {
  port := "8080"

  http.Handle("/", http.FileServer(http.Dir("public")))

  log.Printf("Listening on port %s", port)

  if err := http.ListenAndServe(":"+port, nil); err != nil {
    log.Fatal(err)
  }
}`,
  },
  postcss: {
    default: `const { tailwindConfig } = require('@sajari-ui/core');

tailwindConfig.purge.content.push('./src/**/*.js', './src/**/*.tsx');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')(tailwindConfig),
    require('autoprefixer'),
    require('postcss-clean')({ level: 2 }),
  ],
};`,
    nextjs: `const { tailwindConfig } = require('@sajari-ui/core');

tailwindConfig.purge.content.push(
  './components/**/*.js',
  './pages/**/*.js',
  './pages/**/*.mdx',
  '../node_modules/@sajari-ui/core/dist/*.js',
);

module.exports = {
  plugins: [
    'postcss-import',
    ['tailwindcss', tailwindConfig],
    'autoprefixer',
    ['postcss-clean', { level: 2 }],
  ],
};`,
  },
};
