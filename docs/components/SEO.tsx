import { NextSeo, NextSeoProps } from 'next-seo';
import * as React from 'react';

import defaultSEO from '../seo.config';

interface SeoProps extends NextSeoProps {
  scope?: string;
}

function SEO(props: SeoProps) {
  const { scope, title: titleProp, ...rest } = props;
  let title = scope ? [titleProp, scope].join(' | ') : titleProp;
  const seo = { ...defaultSEO, ...rest, title };

  return <NextSeo {...seo} titleTemplate="%s | Sajari React SDK" />;
}

export default SEO;
