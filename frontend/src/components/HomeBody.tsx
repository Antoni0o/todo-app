import {
  Button,
  Divider,
  Flex,
  Modal,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { CreateTodoModalContent } from "./CreateTodoModalContent";
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
          <Flex width="70%" flexDir="column" alignItems="end">
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
            width="80%"
            borderColor={colorMode === "dark" ? "light.200" : "blue.100"}
            color={colorMode === "dark" ? "light.200" : "blue.100"}
            _hover={{
              bg: colorMode === "dark" ? "light.200" : "blue.100",
              color: colorMode === "dark" ? "blue.100" : "light.200",
            }}
            onClick={onOpen}
          >
            Create To-Do
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <CreateTodoModalContent />
      </Modal>
    </>
  );
};

export { HomeBody };
