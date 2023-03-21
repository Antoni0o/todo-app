import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { CreateTodoModalContent } from "./TodoModals/CreateTodoModalContent";
import { TodosBox } from "./TodosBox";

const HomeBody = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <>
      <Flex
        width="100%"
        flexDirection="column"
        padding={{
          lg: "1rem 5rem",
          md: "1rem 5rem",
          base: "2rem",
        }}
        overflow="hidden"
      >
        <TodosBox />
        <Flex gap="1rem" alignItems="center">
          <Flex
            display={["none", "none", "flex", "flex"]}
            width="70%"
            flexDir="column"
            alignItems="end"
          >
            <Divider
              width="100%"
              marginTop="1rem"
              borderColor={colorMode == "dark" ? "light.200" : "dark.300"}
            />
            <Divider
              width="75%"
              marginTop="1rem"
              borderColor={colorMode == "dark" ? "light.200" : "dark.300"}
            />
            <Divider
              width="50%"
              marginTop="1rem"
              borderColor={colorMode == "dark" ? "light.200" : "dark.300"}
            />
          </Flex>
          <Button
            variant="outline"
            marginTop="1em"
            width={["100%", "100%", "80%", "80%"]}
            borderColor={colorMode == "dark" ? "light.200" : "blue.100"}
            color={colorMode == "dark" ? "light.200" : "blue.100"}
            _hover={{
              bg: colorMode == "dark" ? "light.200" : "blue.100",
              color: colorMode == "dark" ? "blue.100" : "light.200",
            }}
            onClick={onOpen}
          >
            Create To-Do
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <CreateTodoModalContent />
      </Modal>
    </>
  );
};

export { HomeBody };
