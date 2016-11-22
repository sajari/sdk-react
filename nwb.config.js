module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'sajariReact',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
   extra: {
     devtool: 'cheap-source-map'
   }
 }
}
