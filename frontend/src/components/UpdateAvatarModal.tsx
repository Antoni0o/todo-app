import { Box, Button, Flex, Icon, Image, Input, InputGroup, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FiFile } from "react-icons/fi";
import { api } from "../api";

type UpdateAvatarModalProps = {
  id: string
}

const UpdateAvatarModal = ({ id }: UpdateAvatarModalProps) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  return (
    <ModalContent
      color={colorMode == "dark" ? "light.200" : "blue.100"}
      bg={colorMode == "dark" ? "blue.100" : "light.400"}
    >
      <ModalHeader>Change Avatar</ModalHeader>
      <ModalCloseButton />

      <ModalBody
        display="flex"
        flexDir="column"
        gap="1rem"
        alignItems="center"
        textAlign="center"
      >
        <InputGroup
          onClick={() => inputRef.current?.click()}
        >
          <input
            type={'file'}
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files[0];
                setSelectedImage(URL.createObjectURL(file));
                setSelectedFile(file);
              }
            }}
            hidden
            accept="image/*"
            ref={(e) => {
              inputRef.current = e
            }}
          />
          <>
            <Button variant="outlined" border="1px solid" w="100%" leftIcon={<Icon as={FiFile} />}>
              Upload
            </Button>
          </>
        </InputGroup>
        <Flex gap="1rem" flexDir="column">
          <Text fontWeight="bold">Selected Image: </Text>
          {selectedImage ?
            <Image w="8rem" h="8rem" borderRadius="100%" src={selectedImage} alt='Selected Avatar' />
            : <Text bg="gray.200" p="4rem 1rem" borderRadius="100%">Select an Image</Text>
          }
        </Flex>
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
            if (!selectedFile) return;
            const formData = new FormData();
            formData.append("img", selectedFile);

            api.patch(`/user/avatar`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then(() => {
              setTimeout(() => {
                setIsLoading(false);
                router.reload();
              }, 1000);
            });
          }}
        >
          Change Avatar
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export { UpdateAvatarModal };