import axios from "axios";
import {
  Box,
  Link,
  Button,
  Center,
  GridItem,
  Heading,
  Input,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import { RegisterBox } from "./RegisterBox";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useAuth } from "../hooks/useAuth";

const SignInContent = () => {
  const { signIn, error } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colorMode } = useColorMode();
  const router = useRouter();

  function handleSignIn(email: string, password: string) {
    signIn(email, password);
  }

  return (
    <RegisterBox height="420px">
      <GridItem>
        <Box marginLeft="0.4em">
          <ThemeSwitcher />
        </Box>
        <Heading
          marginTop="0.6em"
          marginLeft="0.6em"
          fontWeight="bold"
          fontSize="6xl"
        >
          Sign In
        </Heading>
        <form
          onSubmit={(e) => {
            setIsLoading(true);
            e.preventDefault();

            handleSignIn(email, password);

            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          }}
        >
          <Center flexDirection="column">
            {error && (
              <Text
                fontSize="12px"
                color="danger.300"
                marginBottom="-1.6rem"
                marginTop="0.6rem"
              >
                {error}
              </Text>
            )}
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => {
                const { value } = e.target;
                setEmail(value);
              }}
              width="80%"
              marginTop="2em"
              _focus={{
                borderColor: colorMode == "dark" ? "light.300" : "blue.100",
              }}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                const { value } = e.target;
                setPassword(value);
              }}
              width="80%"
              marginTop="1em"
              _focus={{
                borderColor: colorMode == "dark" ? "light.300" : "blue.100",
              }}
            />
            <Button
              isLoading={isLoading}
              type="submit"
              variant="outline"
              marginTop="1em"
              width="80%"
              borderColor={colorMode == "dark" ? "light.200" : "blue.100"}
              color={colorMode == "dark" ? "light.200" : "blue.100"}
              _hover={{
                bg: colorMode == "dark" ? "light.200" : "blue.100",
                color: colorMode == "dark" ? "blue.100" : "light.200",
              }}
              rightIcon={<FaArrowRight />}
            >
              Sign In
            </Button>
            <Link marginTop="0.4em" onClick={() => router.push("/sign-up")}>
              Or Sign Up
            </Link>
          </Center>
        </form>
      </GridItem>
    </RegisterBox>
  );
};

export { SignInContent };
