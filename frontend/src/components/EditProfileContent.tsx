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
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useDisclosure,
  Modal,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useState } from "react";
import { api } from "../api";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";
import { User } from "../types/User";
import { UpdateAvatarModal } from "./UpdateAvatarModal";

interface IEditProfileContentProps {
  user: User | null;
}

const EditProfileContent = ({ user }: IEditProfileContentProps) => {
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
  const toast = useToast();
  const { onOpen, isOpen, onClose } = useDisclosure();

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
        <Flex flexDir="column" mb="2rem" cursor="pointer" onClick={onOpen}>
          <Avatar
            src={user?.avatar_url}
            m="-4rem 0 0 0"
            w="9rem"
            h="9rem"
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
              fontSize: "0.8rem",
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
        <Box flexDir="column" my="1rem">
          <Alert status='warning'>
            <AlertIcon />
            <AlertTitle>Sign out after update to changes take effect!</AlertTitle>
          </Alert>
        </Box>
        <form
          onSubmit={(e) => {
            setIsLoading(true);
            e.preventDefault();

            api
              .put("/user/update", {
                name: username,
                email
              })
              .then(() => {
                setTimeout(() => {
                  router.push('/home');
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
              });

            if (confirmNewPassword && newPassword) {
              if (newPassword == confirmNewPassword) {
                api
                  .put("/user/update", {
                    name: username,
                    email,
                    oldPassword,
                    newPassword
                  })
                  .then(() => {
                    setTimeout(() => {
                      router.push('/home');
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

                    if (err.message == "The old password dont match!") {
                      setIsOldPasswordInvalid(true);
                    }
                  });

                toast({
                  title: 'Error while updating user',
                  description: 'Passwords are different!',
                  position: 'top-right',
                  status: 'error'
                })

                setIsConfirmNewPasswordInvalid(true);
                setIsNewPasswordInvalid(true);

              }
            }
          }}
        >
          <FormControl marginBottom="1rem">
            <FormLabel>Username:</FormLabel>
            <Input
              placeholder={user?.name}
              value={username}
              onChange={(e) => {
                const { value } = e.target;
                setUsername(value);
              }}
              _focus={{
                borderColor: colorMode == "dark" ? "light.300" : "blue.100",
              }}
            />
          </FormControl>
          <FormControl marginBottom="1rem">
            <FormLabel>E-mail:</FormLabel>
            <Input
              placeholder={user?.email}
              type="email"
              value={email}
              onChange={(e) => {
                const { value } = e.target;
                setEmail(value);
              }}
              _focus={{
                borderColor: colorMode == "dark" ? "light.300" : "blue.100",
              }}
            />
          </FormControl>
          <Divider
            m="0"
            opacity="0.8"
            h="1px"
            bg={colorMode == "dark" ? "light.200" : "dark.300"}
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
              isLoading={isLoading}
              variant="outline"
              borderColor="danger.200"
              color="danger.200"
              _hover={{
                bg: "danger.200",
                color: colorMode == "dark" ? "blue.100" : "light.200",
              }}
              rightIcon={<BsTrashFill />}
              onClick={() => {
                api.delete('/user/delete')
                  .then(() => {
                    router.push('/');
                  })
                  .catch((err) => {
                    toast({
                      title: 'Error while deleting user',
                      description: 'Error: ' + err,
                      position: 'top-right',
                      status: 'error'
                    })
                  });
              }}
            >
              Delete Profile
            </Button>
          </Flex>
        </form>
      </Flex>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <UpdateAvatarModal id={user?.id || ""} />
      </Modal>
    </>
  );
};

export { EditProfileContent };
