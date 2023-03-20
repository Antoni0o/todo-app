import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useRef } from "react";

import { User } from "../types/User";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ListElement } from "./ListElement";
import { useAuth } from "../hooks/useAuth";

interface INavbarProps {
  user: User | null;
}

const Navbar = ({ user }: INavbarProps) => {
  const { signOut } = useAuth();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const avatarRef = useRef<HTMLImageElement>(null);

  return (
    <Flex
      padding="10px 20px"
      justifyContent="space-between"
      alignItems="center"
      gap="10px"
      borderBottom="1px solid"
      borderBottomColor={colorMode == "dark" ? "light.200" : "dark.300"}
    >
      <div>
        <Heading fontSize="2.2rem">To-do&apos;s</Heading>
      </div>
      <Flex alignItems="center" gap="1rem">
        <ThemeSwitcher />
        <Avatar
          ref={avatarRef}
          src={user?.avatar_url}
          onClick={onOpen}
          cursor="pointer"
        />
      </Flex>

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={avatarRef}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent
          margin="0"
          bg={colorMode == "dark" ? "blue.100" : "light.400"}
        >
          <DrawerCloseButton
            marginTop="10px"
            _focus={{
              outline: "none",
            }}
          />
          <Flex margin="10px 20px" justifyContent="start" alignItems="center">
            <Avatar src={user?.avatar_url} />
            <DrawerHeader>{user?.name}</DrawerHeader>
          </Flex>

          <DrawerBody padding="0">
            <List>
              <ListElement>
                <ListIcon fontSize="1rem" as={BsPencilSquare} />
                Edit Profile
              </ListElement>
              <Box
                onClick={() => {
                  signOut();
                }}
              >
                <ListElement>
                  <ListIcon fontSize="1rem" as={FiLogOut} />
                  Logout
                </ListElement>
              </Box>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export { Navbar };
