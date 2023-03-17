import { Box, useColorMode } from "@chakra-ui/react";

const TodosBox = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      marginTop="1rem"
      border="1px solid"
      borderColor={colorMode == "dark" ? "light.200" : "dark.300"}
      borderRadius="xl"
      height="26em"
    ></Box>
  );
};

export { TodosBox };
