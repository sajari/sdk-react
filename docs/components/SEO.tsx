import { NextSeo, NextSeoProps } from 'next-seo';
import React from 'react';

import defaultSEO from '../seo.config';

function SEO(props: NextSeoProps) {
  const seo = { ...defaultSEO, ...props };

  return <NextSeo {...seo} titleTemplate="Sajari React SDK | %s" />;
}

export default SEO;
