import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const colors = {
  darkBg: {
    '50': '#ebebeb',
    '100': '#d7d7d7',
    '200': '#aeaeae',
    '300': '#858585',
    '400': '#5c5c5c',
    '500': '#333333',
    '600': '#282828',
    '700': '#1e1e1e',
    '800': '#141414',
    '900': '#0a0a0a',
  },
};

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors,
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Courier New, Courier, serif',
    mono: 'Menlo, monospace',
  },
  styles: {
    // eslint-disable-next-line
    global: (props: any) => ({
      body: {
        bg: mode('white', 'darkBg.500')(props),
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: 'none',
          outline: '3px solid #ccc',
        },
      },
    },
  },
});
