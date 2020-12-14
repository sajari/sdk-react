const svgr = require('@svgr/rollup').default;

module.exports = {
  rollup(config, opts) {
    config.plugins.push(
      svgr({
        svgoConfig: {
          plugins: {
            removeViewBox: false,
          },
        },
      }),
    );

    if (opts.format === 'esm') {
      config = { ...config, preserveModules: true };
      config.output = {
        ...config.output,
        dir: 'dist/',
        entryFileNames: '[name].esm.js',
      };
      delete config.output.file;
    }

    return config;
  },
};
