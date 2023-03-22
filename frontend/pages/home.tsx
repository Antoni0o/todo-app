import { useRouter } from "next/router";
import { HomeBody } from "../src/components/HomeBody";
import { Navbar } from "../src/components/Navbar";
import { useAuth } from "../src/hooks/useAuth";
import { Heading } from "@chakra-ui/react";
import Head from "next/head";
import Error from "next/error";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();
  const title = "To-do App";

  return (
    <>
      {router.isFallback ? (
        <Heading>Loading...</Heading>
      ) : (
        <>
          <Head>
            <title>{title}</title>
          </Head>
          <Navbar user={user} />
          <HomeBody />
        </>
      )}
    </>
  );
}
