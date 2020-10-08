/* eslint-disable react/no-array-index-key */
import { Box, Button, Flex, FlexProps, Grid, GridProps, tailwindConfig, Tooltip, useClipboard } from '@sajari-ui/core';
import resolveConfig from 'tailwindcss/resolveConfig';

const { theme } = resolveConfig(tailwindConfig);

interface ColorPaletteProps extends FlexProps {
  color: string;
  name: string;
}

interface ColorPalettesProps {
  color: string;
}

export const ColorPalette = (props: ColorPaletteProps) => {
  const { color, name, ...rest } = props;
  let colorCode = color;
  const [shade, hue] = color.split('-');
  const colors = theme.backgroundColor;

  if (shade && hue) {
    colorCode = colors[shade][hue];
  }

  if (color in colors && typeof colors[color] === 'string') {
    colorCode = colors[color];
  }

  const { onCopy, hasCopied } = useClipboard(colorCode);

  return (
    <Flex alignItems="items-center" space="space-x-3" {...rest}>
      <Box
        borderRadius="rounded-md"
        width="w-12"
        height="h-12"
        boxShadow="shadow-border"
        style={{ backgroundColor: colorCode }}
      />
      <Box fontSize="text-sm" textAlign="text-left">
        <Box fontWeight="font-medium" textTransform="capitalize" textColor="text-gray-800">
          {name}
        </Box>
        <Tooltip label={hasCopied ? 'Copied!' : 'Copy'} placement="right">
          <Button
            appearance="subtle-link"
            spacing="none"
            textTransform="uppercase"
            fontFamily="font-mono"
            fontWeight="font-normal"
            fontSize="text-code"
            onClick={onCopy}
          >
            {colorCode}
          </Button>
        </Tooltip>
      </Box>
    </Flex>
  );
};

export const ColorPalettes = (props: ColorPalettesProps) => {
  const { color } = props;
  const keys = Object.keys(theme.backgroundColor[color]);

  return keys.map((item, index) => <ColorPalette key={index} color={`${color}-${item}`} name={`${color} ${item}`} />);
};

export const ColorWrapper = (props: GridProps) => (
  <Grid margin="my-6" gap="gap-6" gridTemplateColumns="grid-cols-5" {...props} />
);
