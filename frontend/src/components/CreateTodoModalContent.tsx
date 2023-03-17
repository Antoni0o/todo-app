import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";

const CreateTodoModalContent = () => {
  const { onClose } = useDisclosure();

  return (
    <ModalContent>
      <ModalHeader>Create To-do</ModalHeader>
      <ModalCloseButton />

      <ModalBody></ModalBody>

      <ModalFooter gap="1rem">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          bg="success.200"
          _hover={{
            bg: "success.100",
          }}
        >
          Create
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export { CreateTodoModalContent };
