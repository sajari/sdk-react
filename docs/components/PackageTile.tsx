import { Box, Heading, Text } from '@sajari-ui/core';

import { BackgroundProps } from '@sajari-ui/core/dist/types';

const PackageTile = ({
  title,
  description,
  href,
  gradient,
}: {
  title: string;
  description: string;
  href: string;
  gradient: BackgroundProps['gradientColorStops'];
}) => (
  <Box
    as="a"
    href={href}
    flex="flex-1"
    textAlign="text-center"
    borderRadius="rounded-xl"
    padding="p-6"
    // @ts-ignore Need to update sajari-ui
    backgroundColor="bg-gradient-to-br"
    gradientColorStops={gradient}
    textColor="text-white"
    space="space-y-4"
    style={{ textShadow: '0 1px 3px rgba(0,0,0,.1),0 1px 2px rgba(0,0,0,.06)' }}
    boxShadow="shadow-md"
    transition="transition"
    transitionDuration="duration-150"
    // @ts-ignore Need to update sajari-ui
    transform={['transform', 'focus:scale-105', 'hover:scale-105']}
  >
    {/* @ts-ignore Need to update sajari-ui */}
    <Heading as="h1" size="lg" textColor="text-inherit">
      {title}
    </Heading>
    <Text>{description}</Text>
  </Box>
);

export default PackageTile;
