const heading = require('mdast-util-heading-range');
const fs = require('fs');
const { parse, importers } = require('react-docgen');
const fromMarkdown = require('mdast-util-from-markdown');

const headingOptions = {
  ignoreFinalDefinitions: true,
  test: 'props table',
};

const inlineCode = (value) => {
  return {
    type: 'inlineCode',
    value,
  };
};

const cell = (children) => {
  return {
    type: 'tableCell',
    children,
  };
};

const text = (value) => {
  return {
    type: 'text',
    value,
  };
};

const row = (name, type, description) => {
  // Parse from props comment into MDAST (markdown AST), then get the children of each "paragraph" node and flatten it
  const parsedDescription = fromMarkdown(description)
    .children.map((c) => {
      if (c.type === 'paragraph') {
        return c.children;
      }
      return c;
    })
    .flat(1);

  return {
    type: 'tableRow',
    children: [cell([inlineCode(name)]), cell([inlineCode(type)]), cell([]), cell(parsedDescription)],
  };
};

const header = () => {
  return {
    type: 'tableRow',
    children: [cell([text('Name')]), cell([text('Type')]), cell([text('Default')]), cell([text('Description')])],
  };
};

const rows = (types) => {
  return Object.entries(types)
    .map(([props, info]) => {
      if (props === 'children' || props === 'styles') {
        return undefined;
      }

      const {
        tsType: { name, raw },
        description,
      } = info;

      return row(props, raw || name, description);
    })
    .filter(Boolean);
};

// Entry
function propsTable(options) {
  if (!options || (options && !options.pathResolver)) {
    throw new Error('pathResolver must be specified');
  }

  let componentPath = '';
  let types = {};

  function onHeading(start, nodes, end) {
    // Inject an additional table node into the mdx file
    return [
      start,
      ...nodes,
      {
        type: 'table',
        children: [header(), ...rows(types)],
      },
      end,
    ];
  }

  function transformer(tree, file) {
    try {
      componentPath = options.pathResolver(file.path);
      if (!componentPath) {
        return;
      }
      const componentContent = fs.readFileSync(componentPath, { encoding: 'utf-8' });
      // Get the props type object
      types =
        parse(componentContent, null, null, {
          importer: importers.makeFsImporter(),
          filename: componentPath,
          babelrc: false,
        }).props || {};

      // remark plugin to scan the mdx and run `onHeading` whenever it sees a heading that matches the criteria
      heading(tree, headingOptions, onHeading);
    } catch (error) {
      console.error(error);
    }
  }

  return transformer;
}

module.exports = propsTable;
