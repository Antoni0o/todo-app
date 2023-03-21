import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../../api";

type DeleteTodoModalProps = {
  id: string;
};

const DeleteTodoModalContent = ({ id }: DeleteTodoModalProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  return (
    <ModalContent
      color={colorMode == "dark" ? "light.200" : "blue.100"}
      bg={colorMode == "dark" ? "blue.100" : "light.400"}
    >
      <ModalHeader>Delete To-do</ModalHeader>
      <ModalCloseButton />

      <ModalBody
        display="flex"
        flexDir="column"
        gap="1rem"
        alignItems="center"
        textAlign="center"
      >
        <Text>Are you sure you want delete this To-do?</Text>
      </ModalBody>

      <ModalFooter gap="1rem">
        <Button
          isLoading={isLoading}
          w="100%"
          bg={colorMode == "dark" ? "blue.100" : "light.400"}
          color="danger.200"
          border="1px solid"
          borderColor="danger.200"
          _hover={{
            bg: "danger.200",
            color: colorMode == "dark" ? "blue.100" : "light.200",
          }}
          onClick={() => {
            api
              .delete(`/todos/delete/${id}`)
              .then(() => {
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);

                toast({
                  title: "To-do deleted successfully",
                  description: "The To-do has been deleted with no errors",
                  status: "success",
                  duration: 3000,
                  position: "top-right",
                  isClosable: true,
                });

                router.reload();
              })
              .catch((err) => {
                toast({
                  title: "Error while deleting a To-do",
                  description:
                    "To-do isn't deleted! Error: " + err.response.data.message,
                  status: "error",
                  duration: 3000,
                  position: "top-right",
                  isClosable: true,
                });
              });
          }}
        >
          Delete
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export { DeleteTodoModalContent };
