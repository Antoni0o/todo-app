import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "../src/api";
import { HomeBody } from "../src/components/HomeBody";
import { Navbar } from "../src/components/Navbar";
import { useAuth } from "../src/hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (user) {
      api.get("/todos/find").then((res) => {
        setTodos(res.data.result.user_todos);
      });
    }
  }, [user]);

  return (
    <>
      <Navbar user={user} />
      {user ? (
        <HomeBody todos={todos} />
      ) : (
        <Flex w="100vw" h="80vh" alignItems="center" justifyContent="center">
          <Heading textAlign="center">Loading...</Heading>
        </Flex>
      )}
    </>
  );
}
