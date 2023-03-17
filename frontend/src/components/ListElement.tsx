import { ListItem, useColorMode } from "@chakra-ui/react";
import AuxProps from "../types/AuxProps";

const ListElement = ({ children }: AuxProps) => {
  const { colorMode } = useColorMode();

  return (
    <ListItem
      display="flex"
      alignItems="center"
      justifyContent="start"
      gap="6px"
      cursor="pointer"
      padding="16px 24px"
      _hover={{
        bg: colorMode === "dark" ? "light.100" : "blue.100",
        color: colorMode === "dark" ? "blue.100" : "light.100",
      }}
    >
      {children}
    </ListItem>
  );
};

export { ListElement };
