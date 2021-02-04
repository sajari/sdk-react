import { NextSeo, NextSeoProps } from 'next-seo';
import * as React from 'react';
import { ValueOf } from 'type-fest';

import defaultSEO from '../seo.config';

export const scopes = {
  classes: 'Classes',
  components: 'Components',
  hooks: 'Hooks',
  searchUI: 'Search UI',
  tracking: 'Tracking',
};

interface SeoProps extends NextSeoProps {
  scope?: ValueOf<typeof scopes>;
}

function SEO(props: SeoProps) {
  const { scope, title: titleProp, ...rest } = props;
  const title = [titleProp, scope].filter(Boolean).join(' | ');
  const seo = { ...defaultSEO, ...rest, title };

  return <NextSeo {...seo} titleTemplate="%s | Sajari React SDK" />;
}

export default SEO;
