import { Box } from '@sajari-ui/core';
import { ILoremIpsumParams, loremIpsum } from 'lorem-ipsum';

const LoremIpsum = (props: ILoremIpsumParams) => {
  const { count = 1, units = 'paragraphs', format = 'html', ...rest } = props;

  const html = loremIpsum({
    count,
    units,
    format,
    ...rest,
  });

  return <Box dangerouslySetInnerHTML={{ __html: html }} />;
};

export default LoremIpsum;
