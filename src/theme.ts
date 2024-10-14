import { extendTheme } from "@chakra-ui/react";
import '@fontsource/open-sans';

const theme = extendTheme({
  fonts: {
    body: `'Open Sans', sans-serif`,
  },
  styles: {
    global: {
      body: {
        padding: '30px',
      }
    }
  }
})

export default theme;
