const path = require('path');
const fs = require('fs');
/* eslint-disable global-require */
const remarkPlugins = [
  [
    require('remark-props-table'),
    {
      // This will be called for each mdx file and we must return the component's file path in order for the docgen to find and parse it
      pathResolver: (filePath) => {
        const componentName = filePath.split('/').slice(-1)[0].replace('.mdx', '');
        const regex = /\/pages\/(.*)\//g;
        const matches = regex.exec(filePath) || [];
        const package = String(matches[1]);
        const resolved = path.resolve(filePath, `../../../../packages/${package}/src/${componentName}/index.tsx`);
        if (!fs.existsSync(resolved)) {
          return '';
        }
        return resolved;
      },
    },
  ],
  require('remark-autolink-headings'),
  require('remark-emoji'),
  require('remark-images'),
  require('remark-slug'),
  require('remark-unwrap-images'),
];

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins,
  },
});

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
});
