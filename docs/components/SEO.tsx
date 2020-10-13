import { NextSeo, NextSeoProps } from 'next-seo';
import React from 'react';

function SEO(props: NextSeoProps) {
  const { description, title } = props;

  return <NextSeo title={title} description={description} titleTemplate="Sajari SDK | %s" />;
}

export default SEO;
