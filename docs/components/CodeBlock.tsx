import { mdx } from '@mdx-js/react';

import * as ReactComponents from '@sajari/react-components';
import * as ReactHooks from '@sajari/react-hooks';
import * as ReactSDK from '@sajari/react-sdk';

import {
  Box,
  CodeCopyButton,
  CodeCopyButtonProps,
  codeThemes,
  Heading,
  tailwindConfig,
  useClipboard,
} from '@sajari-ui/core';
import { Language } from 'prism-react-renderer';
import { useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import * as ReactTable from 'react-table';
import resolveConfig from 'tailwindcss/resolveConfig';

import LoremIpsum from './LoremIpsum';
import makeData from './make-data';
import snippets from './snippets';

const { theme } = resolveConfig(tailwindConfig);

export const liveEditorStyle = {
  fontSize: theme.fontSize.code,
  fontFamily: theme.fontFamily.mono,
  overflow: 'auto',
  padding: 0,
};

const CopyButton = (props: CodeCopyButtonProps) => <CodeCopyButton margin={['mt-4', 'mr-4']} {...props} />;

// @ts-ignore
const LiveCodePreview = (props) => (
  <Box
    as={LivePreview}
    margin="mt-5"
    padding="p-4"
    overflow="overflow-auto"
    borderColor="border-gray-200"
    borderWidth={['border', 'border-b-0']}
    borderRadius="rounded-t-md"
    {...props}
  />
);

// @ts-ignore
const LiveCodeError = (props) => <LiveError className="px-3 py-2 text-white bg-red-500 text-code" {...props} />;

const EditableNotice = () => (
  <Box
    position="absolute"
    offset={['inset-x-0', 'top-0']}
    zIndex="z-0"
    textAlign="text-center"
    pointerEvents="pointer-events-none"
    transform="transform"
    translate="-translate-y-1/2"
  >
    <Heading size="xs" as="h6" textColor="text-gray-500">
      <Box
        as="span"
        display="inline-block"
        verticalAlign="align-middle"
        padding={['px-2', 'py-1']}
        backgroundColor="bg-white"
        borderWidth="border"
        borderColor="border-gray-200"
        borderRadius="rounded-full"
        lineHeight="leading-none"
        boxShadow="shadow-sm"
      >
        Editable Example
      </Box>
    </Heading>
  </Box>
);

interface CodeBlockProps {
  children: string;
  className?: string;
  live?: boolean;
  manual?: boolean;
  render?: boolean;
}

const CodeBlock = (props: CodeBlockProps) => {
  const { className = '', live = true, manual = false, render = false, children, ...rest } = props;
  const [editorCode, setEditorCode] = useState(children.trim());
  const language = (className && (className.replace(/language-/, '') as Language)) || 'jsx';
  const { onCopy, hasCopied } = useClipboard(editorCode);

  const liveProviderProps = {
    theme: codeThemes.dark,
    language,
    code: editorCode,
    scope: {
      ...ReactComponents,
      ...ReactHooks,
      ...ReactSDK,
      mdx,
      LoremIpsum,
      snippets,
      makeData,
      ReactTable,
    },
    noInline: manual,
    ...rest,
  };

  const handleCodeChange = (newCode: string) => setEditorCode(newCode.trim());

  if (language === 'jsx' && live === true) {
    return (
      <LiveProvider {...liveProviderProps}>
        <Box position="relative">
          <EditableNotice />
          <LiveCodePreview />
          <LiveCodeError />
          <Box position="relative">
            <CopyButton onClick={onCopy} theme="dark">
              {hasCopied ? 'Copied!' : 'Copy'}
            </CopyButton>
            {/* @ts-ignore padding works but isn't in types?! */}
            <LiveEditor onChange={handleCodeChange} style={liveEditorStyle} padding={20} className="rounded-b-md" />
          </Box>
        </Box>
      </LiveProvider>
    );
  }

  if (render) {
    return (
      <div style={{ marginTop: '40px' }}>
        <LiveProvider {...liveProviderProps}>
          <LiveCodePreview />
        </LiveProvider>
      </div>
    );
  }

  return (
    <LiveProvider disabled {...liveProviderProps}>
      <Box position="relative">
        <CopyButton onClick={onCopy} theme="dark">
          {hasCopied ? 'Copied!' : 'Copy'}
        </CopyButton>
        {/* @ts-ignore padding works but isn't in types?! */}
        <LiveEditor style={liveEditorStyle} padding={20} className="rounded-md" />
      </Box>
    </LiveProvider>
  );
};

CodeBlock.defaultProps = {
  mountStylesheet: false,
};

export default CodeBlock;
