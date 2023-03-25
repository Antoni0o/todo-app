import { Accordion, Box, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { TodoAccordion } from "./TodoAccordion";

type TodosBoxProps = {
  todos: any[];
};

const TodosBox = ({ todos }: TodosBoxProps) => {
  const { colorMode } = useColorMode();

  return (
    <>
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
          scrollbarColor: colorMode == "dark" ? "light.200" : "dark.300",
          "::-webkit-scrollbar": {
            width: "5px",
            margin: "2rem",
          },
          "::-webkit-scrollbar-track": {
            borderRadius: "50px",
            margin: "1rem",
            background: "transparent",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: colorMode == "dark" ? "light.200" : "dark.300",
            border: "1px solid",
            borderColor: colorMode == "dark" ? "dark.300" : "light.200",
            borderRadius: "10px",
          },
        }}
      >
        <Accordion allowMultiple display="flex" flexDir="column" gap="1rem">
          {todos ? (
            todos.map((todo) => {
              const deadline = new Date(todo["deadline"]).toLocaleDateString(
                "pt-BR",
                { timeZone: "UTC" }
              );

              return (
                <TodoAccordion
                  title={todo["name"]}
                  description={todo["description"]}
                  deadline={deadline}
                  done={todo["done"]}
                  overtime={todo["out_of_time"]}
                  id={todo["id"]}
                  key={todo["created_at"]}
                />
              );
            })
          ) : (
            <Flex alignItems="center" justifyContent="center">
              <Heading textAlign="center">Loading...</Heading>
            </Flex>
          )}
        </Accordion>
      </Box>
    </>
  );
};

export { TodosBox };
