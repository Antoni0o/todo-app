import {
  Button,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../api";

const CreateTodoModalContent = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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
          bg="success.200"
          color={colorMode == "dark" ? "light.200" : "blue.100"}
          _hover={{
            bg: "success.100",
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
                }, 1000);

                toast({
                  title: "To-do created successfully",
                  description: "The To-do has been created with no errors",
                  status: "success",
                  duration: 3000,
                  position: "top-right",
                  isClosable: true,
                });

                router.reload();
              })
              .catch((err) => {
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);

                if (todoTitle == "") {
                  setIsTodoTitleInvalid(true);
                }

                if (todoDeadline == "") {
                  setIsTodoDeadlineInvalid(true);
                }

                toast({
                  title: "Error while creating a To-do",
                  description:
                    "To-do isn't created! Error: " + err.response.data.message,
                  status: "error",
                  duration: 3000,
                  position: "top-right",
                  isClosable: true,
                });
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
