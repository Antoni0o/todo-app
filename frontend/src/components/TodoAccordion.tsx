import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";

type TodoAccordionProps = {
  title: string;
  deadline: string;
  status: string;
};

const TodoAccordion = ({ title, deadline, status }: TodoAccordionProps) => {
  const { colorMode } = useColorMode();

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
        <Flex w="80%" alignItems="center" gap="0.4rem">
          <Box w="0.6rem" h="0.6rem" bg="danger.300" borderRadius="100%" />
          <Text fontWeight="bold" maxW="100%" noOfLines={1}>
            {title}
          </Text>
        </Flex>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Flex
          flexDir={["column", "column", "row"]}
          gap={["0.4rem", "1rem", "6rem"]}
        >
          <Flex
            w={["100%", "100%", "auto"]}
            justifyContent={["space-between", "space-between", "start"]}
            gap={["0", "0", "6rem"]}
            marginBottom="1rem"
            p={["0.4rem 1rem", "0.6rem 1.2rem", "1rem 2rem"]}
            border="1px solid"
            borderColor={colorMode == "dark" ? "light.200" : "dark.300"}
            borderRadius="16px"
          >
            <Flex flexDir="column">
              <Text fontWeight="bold">Deadline: </Text>
              <Text>{deadline}</Text>
            </Flex>
            <Flex flexDir="column">
              <Text fontWeight="bold">Status: </Text>
              <Text>{status}</Text>
            </Flex>
          </Flex>
          <Flex flexDir="column">
            <Text fontWeight="bold">Description: </Text>
            <Text>Teste</Text>
          </Flex>
        </Flex>
      </AccordionPanel>
      <Flex
        p="0.4rem 2rem"
        borderTop="1px solid"
        gap={["", "", "2rem"]}
        borderColor={colorMode == "dark" ? "light.200" : "dark.300"}
        justifyContent={["space-between", "space-between", "end"]}
      >
        <Box>Editar</Box>
        <Box>Deletar</Box>
      </Flex>
    </AccordionItem>
  );
};

export { TodoAccordion };
