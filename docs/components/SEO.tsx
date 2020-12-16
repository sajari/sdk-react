import { NextSeo, NextSeoProps } from 'next-seo';
import * as React from 'react';

import defaultSEO from '../seo.config';

function SEO(props: NextSeoProps) {
  const seo = { ...defaultSEO, ...props };

  return <NextSeo {...seo} titleTemplate="Sajari React SDK | %s" />;
}

export default SEO;
