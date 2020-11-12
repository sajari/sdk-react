import Color from 'color';
import { useTheme } from 'sajari-react-sdk-styles';
import tw, { theme as twTheme, TwStyle } from 'twin.macro';

export interface UseRingStylesProps {
  invalid?: boolean;
  disabled?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none';
  color?: string;
  visible?: boolean;
}

export default function useRingStyles(props?: UseRingStylesProps) {
  const theme = useTheme();
  const { visible = true, disabled, invalid, rounded = 'lg', color = theme.color.primary.base } = props ?? {};
  const styles: (TwStyle | string)[] = [];

  if (visible) {
    let borderColor = color;

    if (disabled) {
      borderColor = twTheme`colors.gray.500`;
    } else if (invalid) {
      borderColor = twTheme`colors.red.500`;
    }

    let borderRadius;

    switch (rounded) {
      case 'sm':
        borderRadius = tw`after:(rounded-md)`;
        break;
      case 'md':
        borderRadius = tw`after:(rounded-md)`;
        break;
      case 'full':
        borderRadius = tw`after:(rounded-full)`;
        break;
      case 'none':
        borderRadius = tw`after:(rounded-none)`;
        break;
      case 'lg':
      default:
        borderRadius = tw`after:(rounded-lg)`;
    }

    styles.push(
      tw`after:(content box-content block h-full w-full border-2 p-0.5 absolute)`,
      `&::after {
          left: -0.25rem;
          top: -0.25rem;
          border-color: ${new Color(borderColor)};
        }`,
      borderRadius,
    );
  }

  return styles;
}
