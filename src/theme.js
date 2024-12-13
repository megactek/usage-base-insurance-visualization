import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
      },
    },
  },
  components: {
    FormLabel: {
      baseStyle: {
        fontWeight: "medium",
      },
    },
    Tooltip: {
      baseStyle: {
        bg: "blue.700",
        color: "white",
      },
    },
  },
});

export default theme;
