import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";
import {
  AiFillCheckCircle,
  AiFillClockCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { MdOutlineDoneAll, MdOutlineRemoveDone } from "react-icons/md";
import { DeleteTodoModalContent } from "./TodoModals/DeleteTodoModalContent";
import { EditTodoModalContent } from "./TodoModals/EditTodoModalContent";
import { api } from "../api";
import { useRouter } from "next/router";

type TodoAccordionProps = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  done: boolean;
  overtime: boolean;
};

const TodoAccordion = ({
  id,
  title,
  description,
  deadline,
  done,
  overtime,
}: TodoAccordionProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [status, setStatus] = useState("To-do");
  const deleteTodoModal = useDisclosure();
  const editTodoModal = useDisclosure();

  useEffect(() => {
    if (done) {
      setStatus("Done");
    } else if (overtime) {
      setStatus("Overtime");
    } else {
      setStatus("To-do");
    }
  }, []);

  return (
    <>
      <AccordionItem
        border="1px solid"
        borderRadius="8px"
        borderColor={colorMode == "dark" ? "light.200" : "dark.300"}
      >
        <AccordionButton
          justifyContent="space-between"
          _focus={{
            boxShadow: "transparent",
            outline: "none",
          }}
        >
          <Flex alignItems="center" gap="0.4rem">
            {status == "Overtime" ? (
              <AiFillCloseCircle color="#E94957" />
            ) : status == "Done" ? (
              <AiFillCheckCircle color="#228176" />
            ) : (
              <AiFillClockCircle color="#5C5C5C" />
            )}
            <Flex flexDir={["column", "column", "row"]} alignItems="start">
              <Text
                color={
                  status == "Overtime"
                    ? "danger.100"
                    : colorMode == "dark"
                    ? "light.200"
                    : "blue.100"
                }
                fontWeight="bold"
              >
                Deadline: &nbsp;
              </Text>
              <Text
                color={
                  status == "Overtime"
                    ? "danger.100"
                    : colorMode == "dark"
                    ? "light.200"
                    : "blue.100"
                }
              >
                {deadline}
              </Text>
            </Flex>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Flex
            flexDir={["column", "column", "row"]}
            gap={["0.4rem", "1rem", "6rem"]}
          >
            <Flex flexDir="column" justifyContent="space-between" gap="0.4rem">
              <Flex flexDir="column">
                <Text fontWeight="bold">Status: </Text>
                <Flex
                  p={["0.4rem 1rem", "0.6rem 1.2rem", "1rem 2rem"]}
                  alignItems="center"
                  border="1px solid"
                  borderColor={colorMode == "dark" ? "light.200" : "dark.300"}
                  borderRadius="16px"
                >
                  <Text fontWeight="bold">{status}</Text>
                </Flex>
              </Flex>
              <Flex
                flexDir="column"
                gap="0.4rem"
                p="0.4rem"
                alignItems="center"
                border="1px solid"
                borderColor={colorMode == "dark" ? "light.200" : "dark.300"}
                borderRadius="16px"
              >
                <Button
                  w="100%"
                  bg={colorMode == "dark" ? "blue.100" : "light.400"}
                  color={colorMode == "dark" ? "light.200" : "blue.100"}
                  _hover={{
                    bg: colorMode == "dark" ? "light.200" : "blue.100",
                    color: colorMode == "dark" ? "blue.100" : "light.200",
                  }}
                  leftIcon={<BsPencilSquare />}
                  onClick={editTodoModal.onOpen}
                >
                  Edit
                </Button>
                <Button
                  w="100%"
                  bg={colorMode == "dark" ? "blue.100" : "light.400"}
                  color="danger.200"
                  _hover={{
                    bg: "danger.200",
                    color: colorMode == "dark" ? "blue.100" : "light.200",
                  }}
                  leftIcon={<BsTrashFill />}
                  onClick={deleteTodoModal.onOpen}
                >
                  Delete
                </Button>
              </Flex>
            </Flex>
            <Flex flexDir="column" gap="0.4rem" w="100%">
              <Text fontWeight="bold">Description: </Text>
              <Flex
                h="10rem"
                p={["0.4rem 1rem", "0.6rem 1.2rem", "1rem 2rem"]}
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderColor={colorMode == "dark" ? "light.200" : "dark.300"}
                borderRadius="16px"
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
                <Text h="100%" w="100%">
                  {description}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </AccordionPanel>
        <Flex
          p="0.6rem"
          borderTop="1px solid"
          gap={["", "", "2rem"]}
          borderColor={colorMode == "dark" ? "light.200" : "dark.300"}
          justifyContent="space-between"
          alignItems={["end", "end", "center"]}
          flexDir={["column", "column", "row"]}
        >
          <Flex
            w="100%"
            justifyContent={["center", "center", "start"]}
            gap="0.4rem"
          >
            <Text fontSize="1.2rem" fontWeight="bold" maxW="100%" noOfLines={2}>
              {title}
            </Text>
          </Flex>
          <Flex gap="0.4rem">
            {!done ? (
              <Button
                w="100%"
                bg={colorMode == "dark" ? "blue.100" : "light.400"}
                color="success.200"
                _hover={{
                  bg: "success.200",
                  color: colorMode == "dark" ? "blue.100" : "light.200",
                }}
                leftIcon={<MdOutlineDoneAll />}
                fontSize={["0.8rem", "1rem"]}
                onClick={() => {
                  api.patch(`/todos/done/${id}`).then(() => router.reload());
                }}
              >
                Done
              </Button>
            ) : (
              <Button
                w="100%"
                bg={colorMode == "dark" ? "blue.100" : "light.400"}
                color="dark.100"
                _hover={{
                  bg: "dark.100",
                  color: colorMode == "dark" ? "blue.100" : "light.200",
                }}
                leftIcon={<MdOutlineRemoveDone />}
                fontSize={["0.8rem", "1rem"]}
                onClick={() => {
                  api.patch(`/todos/done/${id}`).then(() => router.reload());
                }}
              >
                Undone
              </Button>
            )}
          </Flex>
        </Flex>
      </AccordionItem>

      <Modal
        isCentered
        isOpen={deleteTodoModal.isOpen}
        onClose={deleteTodoModal.onClose}
      >
        <ModalOverlay />
        <DeleteTodoModalContent id={id} />
      </Modal>

      <Modal
        isCentered
        isOpen={editTodoModal.isOpen}
        onClose={editTodoModal.onClose}
      >
        <ModalOverlay />
        <EditTodoModalContent
          id={id}
          title={title}
          description={description}
          deadline={deadline}
        />
      </Modal>
    </>
  );
};

export { TodoAccordion };
