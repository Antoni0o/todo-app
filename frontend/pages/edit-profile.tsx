import { EditProfileContent } from "../src/components/EditProfileContent";
import { Navbar } from "../src/components/Navbar";
import { useAuth } from "../src/hooks/useAuth";

export default function EditProfile() {
  const { user } = useAuth();

  return (
    <>
      <Navbar user={user} />
      <EditProfileContent />
    </>
  );
}
