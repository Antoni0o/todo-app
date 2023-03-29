import {
  Box,
  Button,
  Heading,
  Input,
  useColorMode,
  Flex,
  Avatar,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useState } from "react";
import { api } from "../api";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";

const EditProfileContent = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isOldPasswordInvalid, setIsOldPasswordInvalid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isNewPasswordInvalid, setIsNewPasswordInvalid] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isConfirmNewPasswordInvalid, setIsConfirmNewPasswordInvalid] = useState(false);

  const { colorMode } = useColorMode();
  const router = useRouter();

  return (
    <>
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        border="1px solid"
        borderRadius="10px"
        m="4rem 2rem"
        p="1rem 1rem 4rem 1rem"
      >
        <Flex flexDir="column" mb="2rem">
          <Avatar
            name="Antonio"
            m="-4rem 0 0 0"
            w="8rem"
            h="8rem"
            border="0.4rem solid"
            color={colorMode == "dark" ? "blue.100" : "light.400"}
            outline="1px solid"
            outlineColor={colorMode == "dark" ? "light.400" : "blue.100"}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="2rem"
            h="2rem"
            p="0.4rem"
            borderRadius={"full"}
            zIndex="1"
            m="-1.8rem 0 0 0"
            bg={colorMode == "dark" ? "light.400" : "blue.100"}
            color={colorMode == "dark" ? "blue.100" : "light.400"}
            transition="0.1s"
            _hover={{
              width: "100%",
              gap: "0.4rem",
              _after: {
                content: '"Change Avatar"',
              },
            }}
          >
            <BsPencilSquare />
          </Box>
        </Flex>
        <Heading fontWeight="bold" fontSize="3xl">
          Edit Profile
        </Heading>
        <form
          onSubmit={(e) => {
            setIsLoading(true);
            e.preventDefault();

            if(newPassword == confirmNewPassword) {
              api
                .post("/user/", {
                  name: username,
                  email,
                  oldPassword,
                  newPassword
                })
                .then(() => {
                  setTimeout(() => {
                    router.push("/");
                  }, 1000);
                })
                .catch((err) => {
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 1000);

                  toast({
                    title: 'Error while updating user',
                    description: err.message,
                    position: 'top-right',
                    status: 'error'
                  });

                  if(err.message == "The old password dont match!") {
                    setIsOldPasswordInvalid(true);
                  }
                });
            }

            toast({
              title: 'Error while updating user',
              description: 'Passwords are different!',
              position: 'top-right',
              status: 'error'
            })
            
            setIsConfirmNewPasswordInvalid(true);
            setIsNewPasswordInvalid(true);
          }}
        >
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => {
              const { value } = e.target;
              setUsername(value);
            }}
            marginTop="2em"
            _focus={{
              borderColor: colorMode == "dark" ? "light.300" : "blue.100",
            }}
          />
          <Input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => {
              const { value } = e.target;
              setEmail(value);
            }}
            marginTop="1em"
            _focus={{
              borderColor: colorMode == "dark" ? "light.300" : "blue.100",
            }}
          />
          <Input
            isInvalid={isOldPasswordInvalid}
            placeholder="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => {
              const { value } = e.target;
              setOldPassword(value);
            }}
            marginTop="1em"
            _focus={{
              borderColor: colorMode == "dark" ? "light.300" : "blue.100",
            }}
          />
          <Input
            isInvalid={isNewPasswordInvalid}
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => {
              const { value } = e.target;
              setNewPassword(value);
            }}
            marginTop="1em"
            _focus={{
              borderColor: colorMode == "dark" ? "light.300" : "blue.100",
            }}
          />
          <Input
            isInvalid={isConfirmNewPasswordInvalid}
            placeholder="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => {
              const { value } = e.target;
              setConfirmNewPassword(value);
            }}
            marginTop="1em"
            _focus={{
              borderColor: colorMode == "dark" ? "light.300" : "blue.100",
            }}
          />
          <Flex flexDir="column" marginTop="1em" gap="1rem">
            <Button
              isDisabled
              isLoading={isLoading}
              type="submit"
              variant="outline"
              borderColor={colorMode == "dark" ? "light.200" : "blue.100"}
              color={colorMode == "dark" ? "light.200" : "blue.100"}
              _hover={{
                bg: colorMode == "dark" ? "light.200" : "blue.100",
                color: colorMode == "dark" ? "blue.100" : "light.200",
              }}
              rightIcon={<BsPencilSquare />}
            >
              Edit Profile
            </Button>
            <Divider
              m="0"
              opacity="0.8"
              h="1px"
              bg={colorMode == "dark" ? "light.200" : "dark.300"}
            />
            <Button
              isDisabled
              isLoading={isLoading}
              variant="outline"
              borderColor="danger.200"
              color="danger.200"
              _hover={{
                bg: "danger.200",
                color: colorMode == "dark" ? "blue.100" : "light.200",
              }}
              rightIcon={<BsTrashFill />}
            >
              Delete Profile
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export { EditProfileContent };
