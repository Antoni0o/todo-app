import { ChakraProvider } from "@chakra-ui/provider";
import type { AppProps } from "next/app";
import "@fontsource/open-sans";

import theme from "../src/theme";
import { AuthProvider } from "../src/context/AuthContext";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider resetCSS={true} theme={theme}>
        <Head>
          <title>Todo App</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
