import { mode } from "@chakra-ui/theme-tools";

import { IGlobalStyleProps } from "../types/IGlobalStylesProps";

const styles = {
  global: (props: IGlobalStyleProps) => ({
    body: {
      color: mode('blue.100', 'light.200')(props),
      bg: mode('light.400', 'blue.100')(props),
      scrollbarWidth: "thin",
      scrollbarColor: mode('blue.100', 'light.200')(props),
      "::-webkit-scrollbar": {
        width: "5px",
        margin: "2rem",
      },
      "::-webkit-scrollbar-track": {
        borderRadius: "50px",
        background: "transparent",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: mode('blue.100', 'light.200')(props),
        border: "1px solid",
        borderColor: mode('light.400', 'blue.100')(props),
        borderRadius: "10px",
      }
    }
  }),
};

export { styles };