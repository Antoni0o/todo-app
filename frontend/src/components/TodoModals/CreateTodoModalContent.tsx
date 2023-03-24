import {
  Button,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../../api";

const CreateTodoModalContent = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);

  const [isTodoTitleInvalid, setIsTodoTitleInvalid] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoDeadline, setTodoDeadline] = useState("");
  const [isTodoDeadlineInvalid, setIsTodoDeadlineInvalid] = useState(false);

  return (
    <ModalContent
      color={colorMode == "dark" ? "light.200" : "blue.100"}
      bg={colorMode == "dark" ? "blue.100" : "light.400"}
    >
      <ModalHeader>Create To-do</ModalHeader>
      <ModalCloseButton />

      <ModalBody display="flex" flexDir="column" gap="1rem">
        <Input
          isInvalid={isTodoTitleInvalid}
          type="text"
          _focus={{
            borderColor: colorMode == "dark" ? "light.300" : "blue.100",
          }}
          placeholder="To-do Title"
          value={todoTitle}
          onChange={(e) => {
            const { value } = e.target;
            setTodoTitle(value);
          }}
        />
        <Input
          type="text"
          _focus={{
            borderColor: colorMode == "dark" ? "light.300" : "blue.100",
          }}
          placeholder="To-do Description"
          value={todoDescription}
          onChange={(e) => {
            const { value } = e.target;
            setTodoDescription(value);
          }}
        />
        <Input
          isInvalid={isTodoDeadlineInvalid}
          type="date"
          _focus={{
            borderColor: colorMode == "dark" ? "light.300" : "blue.100",
          }}
          sx={{
            "::-webkit-calendar-picker-indicator": {
              filter: colorMode == "dark" ? "invert(100%)" : "",
            },
          }}
          value={todoDeadline}
          onChange={(e) => {
            const { value } = e.target;
            setTodoDeadline(value);
          }}
        />
      </ModalBody>

      <ModalFooter gap="1rem">
        <Button
          isLoading={isLoading}
          w="100%"
          bg={colorMode == "dark" ? "blue.100" : "light.400"}
          color="success.200"
          border="1px solid"
          borderColor="success.200"
          _hover={{
            bg: "success.200",
            color: colorMode == "dark" ? "blue.100" : "light.200",
          }}
          onClick={() => {
            setIsTodoTitleInvalid(false);
            setIsTodoDeadlineInvalid(false);
            setIsLoading(true);

            api
              .post("/todos", {
                name: todoTitle,
                description: todoDescription,
                deadline: todoDeadline,
              })
              .then(() => {
                setTimeout(() => {
                  setIsLoading(false);
                  router.reload();
                }, 1000);
              })
              .catch(() => {
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);

                if (todoTitle == "") {
                  setIsTodoTitleInvalid(true);
                }

                if (todoDeadline == "") {
                  setIsTodoDeadlineInvalid(true);
                }
              });
          }}
        >
          Create
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export { CreateTodoModalContent };
