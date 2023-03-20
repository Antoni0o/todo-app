import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";
import {
  AiFillCheckCircle,
  AiFillClockCircle,
  AiFillCloseCircle,
} from "react-icons/ai";

type TodoAccordionProps = {
  title: string;
  deadline: string;
  done: boolean;
  overtime: boolean;
};

const TodoAccordion = ({
  title,
  deadline,
  done,
  overtime,
}: TodoAccordionProps) => {
  const { colorMode } = useColorMode();
  const [status, setStatus] = useState("To-do");

  useEffect(() => {
    if (overtime) {
      setStatus("Overtime");
    } else if (done) {
      setStatus("Done");
    } else {
      setStatus("To-do");
    }
  }, []);

  return (
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
          {overtime ? (
            <AiFillCloseCircle color="#E94957" />
          ) : done ? (
            <AiFillCheckCircle color="#228176" />
          ) : (
            <AiFillClockCircle color="#5C5C5C" />
          )}
          <Flex flexDir={["column", "column", "row"]} alignItems="start">
            <Text color={overtime ? "danger.100" : ""} fontWeight="bold">
              Deadline: &nbsp;
            </Text>
            <Text color={overtime ? "danger.100" : ""}>{deadline}</Text>
          </Flex>
        </Flex>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Flex
          flexDir={["column", "column", "row"]}
          gap={["0.4rem", "1rem", "6rem"]}
        >
          <Flex flexDir="column" gap="0.4rem">
            <Text fontWeight="bold">Status: </Text>
            <Flex
              p={["0.4rem 1rem", "0.6rem 1.2rem", "1rem 2rem"]}
              alignItems="center"
              border="1px solid"
              borderColor={colorMode == "dark" ? "light.200" : "dark.300"}
              borderRadius="16px"
            >
              <Text>{status}</Text>
            </Flex>
          </Flex>
          <Flex flexDir="column" gap="0.4rem">
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
                "The quick brown fox jumps over the lazy dog" is an
                English-language pangram—a sentence that contains all of the
                letters of the English alphabet. Owing to its existence, Chakra
                was created.
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
          <Button
            w="50%"
            bg={colorMode == "dark" ? "blue.100" : "light.400"}
            color={colorMode == "dark" ? "light.200" : "blue.100"}
            _hover={{
              bg: colorMode == "dark" ? "light.200" : "blue.100",
              color: colorMode == "dark" ? "blue.100" : "light.200",
            }}
            leftIcon={<BsPencilSquare />}
            fontSize={["0.8rem", "1rem"]}
          >
            Edit
          </Button>
          <Button
            w="50%"
            bg={colorMode == "dark" ? "blue.100" : "light.400"}
            color="danger.200"
            _hover={{
              bg: "danger.200",
              color: colorMode == "dark" ? "blue.100" : "light.200",
            }}
            leftIcon={<BsTrashFill />}
            fontSize={["0.8rem", "1rem"]}
          >
            Delete
          </Button>
        </Flex>
      </Flex>
    </AccordionItem>
  );
};

export { TodoAccordion };
