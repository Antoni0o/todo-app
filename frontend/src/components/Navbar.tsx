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
import Link from "next/link";

interface INavbarProps {
  user: User | null;
}

const Navbar = ({ user }: INavbarProps) => {
  const { signOut } = useAuth();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        padding="10px 20px"
        justifyContent="space-between"
        alignItems="center"
        gap="10px"
        borderBottom="1px solid"
        borderBottomColor={colorMode == "dark" ? "light.200" : "dark.300"}
      >
        <div>
          <Link href="/home">
            <Heading fontSize="2.2rem">To-do&apos;s</Heading>
          </Link>
        </div>
        <Flex alignItems="center" gap="1rem">
          <ThemeSwitcher />
          <Avatar src={user?.avatar_url} onClick={onOpen} cursor="pointer" />
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
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
              <a href="/edit-profile">
                <ListElement>
                  <ListIcon fontSize="1rem" as={BsPencilSquare} />
                  Edit Profile
                </ListElement>
              </a>
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
    </>
  );
};

export { Navbar };
