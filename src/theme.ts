import { extendTheme } from '@chakra-ui/react';
import '@fontsource/open-sans';

const theme = extendTheme({
  fonts: {
    body: '\'Open Sans\', sans-serif',
  },
  styles: {
    global: {
      body: {
        // padding: '30px 0',
        maxWidth: '1480px',
        margin: 'auto',
        height: '100vh'
      }
    }
  }
});

export default theme;
