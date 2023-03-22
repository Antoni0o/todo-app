import { Accordion, Box, Heading, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../api";
import { TodoAccordion } from "./TodoAccordion";

type TodosBoxProps = {
  data: any[];
};

const TodosBox = ({ data }: TodosBoxProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  return (
    <>
      {router.isFallback ? (
        <Heading>Loading...</Heading>
      ) : (
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
            {data?.map((todo) => {
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
      )}
    </>
  );
};

export async function getServerSideProps() {
  let data;

  api.get("/todos/find").then((res) => {
    data = res.data.result.user_todos;
  });

  return { props: { data } };
}

export { TodosBox };
