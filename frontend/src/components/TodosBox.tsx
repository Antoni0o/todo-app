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
      height="70vh"
      p={["0.6rem", "1rem"]}
      overflowY="scroll"
      sx={{
        scrollbarWidth: "thin",
        scrollbarColor: "light.200",
        "::-webkit-scrollbar": {
          width: "3px",
          margin: "2rem",
        },
        "::-webkit-scrollbar-track": {
          borderRadius: "50px",
          margin: "1rem",
          background: "transparent",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "light.200",
          borderRadius: "10px",
        },
      }}
    >
      <Accordion allowMultiple allowToggle>
        <TodoAccordion
          title="Festa de Aniversário do Antonio"
          deadline="28/07/2023"
          done={false}
          overtime={true}
        />
      </Accordion>
    </Box>
  );
};

export { TodosBox };
