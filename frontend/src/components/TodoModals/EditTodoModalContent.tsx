import {
  Button,
  FormControl,
  FormHelperText,
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

type EditTodoModalProps = {
  id: string;
  title: string;
  description: string;
  deadline: string;
};

const EditTodoModalContent = ({
  id,
  title,
  description,
  deadline,
}: EditTodoModalProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);

  const [todoTitle, setTodoTitle] = useState(title);
  const [todoDescription, setTodoDescription] = useState(description);
  const [todoDeadline, setTodoDeadline] = useState("");

  return (
    <ModalContent
      color={colorMode == "dark" ? "light.200" : "blue.100"}
      bg={colorMode == "dark" ? "blue.100" : "light.400"}
    >
      <ModalHeader>Edit To-do</ModalHeader>
      <ModalCloseButton />

      <ModalBody display="flex" flexDir="column" gap="1rem">
        <Input
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
        <FormControl>
          <Input
            type="date"
            _focus={{
              borderColor: colorMode == "dark" ? "light.300" : "blue.100",
            }}
            sx={{
              "::-webkit-calendar-picker-indicator": {
                filter: colorMode == "dark" ? "invert(100%)" : "",
              },
            }}
            onChange={(e) => {
              const { value } = e.target;
              setTodoDeadline(value);
            }}
          />
          <FormHelperText>Old deadline: {deadline}</FormHelperText>
        </FormControl>
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
            setIsLoading(true);

            api
              .put(`/todos/update/${id}`, {
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
              .catch((err) => {
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);
              });
          }}
        >
          Edit
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export { EditTodoModalContent };
