import { Box } from '@sajari-ui/core';
import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <Box as="body" textColor="text-gray-600">
          <Main />
          <NextScript />
        </Box>
      </Html>
    );
  }
}

export default Document;
