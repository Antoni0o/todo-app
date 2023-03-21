import { Accordion, Box, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "../api";
import { TodoAccordion } from "./TodoAccordion";

const TodosBox = () => {
  const { colorMode } = useColorMode();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    api.get("/todos/find").then((res) => {
      setTodos(res.data.result.user_todos);
    });
  }, []);

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
      <Accordion
        allowMultiple
        allowToggle
        display="flex"
        flexDir="column"
        gap="1rem"
      >
        {todos?.map((todo) => {
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
        })}
      </Accordion>
    </Box>
  );
};

export { TodosBox };
