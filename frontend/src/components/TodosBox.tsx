import { Accordion, Box, useColorMode } from "@chakra-ui/react";
import { TodoAccordion } from "./TodoAccordion";

const TodosBox = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      marginTop="1rem"
      border="1px solid"
      borderColor={colorMode == "dark" ? "light.200" : "dark.300"}
      borderRadius="xl"
      height="26em"
      p="2rem"
    >
      <Accordion allowMultiple allowToggle>
        <TodoAccordion title="deadline" deadline="title" status="overtime" />
      </Accordion>
    </Box>
  );
};

export { TodosBox };
