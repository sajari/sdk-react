import { NextSeo, NextSeoProps } from 'next-seo';
import * as React from 'react';

import defaultSEO from '../seo.config';

interface SeoProps extends NextSeoProps {
  scope?: string;
}

function SEO(props: SeoProps) {
  const { scope, title: titleProp, ...rest } = props;
  const title = [titleProp, scope].filter(Boolean).join(' | ');
  const seo = { ...defaultSEO, ...rest, title };

  return <NextSeo {...seo} titleTemplate="%s | Sajari React SDK" />;
}

export default SEO;
