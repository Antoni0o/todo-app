import { HomeBody } from "../src/components/HomeBody";
import { Navbar } from "../src/components/Navbar";
import { useAuth } from "../src/hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <>
      <Navbar user={user} />
      <HomeBody />
    </>
  );
}
