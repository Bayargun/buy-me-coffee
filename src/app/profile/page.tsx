import { Navbar } from "../(user)/create-profile/components/Navbar";
import SelectedProfilePage from "./[id]/page";
import { Donation } from "./_components/Donationsuccess";

export default function Home() {
  return (
    <div>
      <Navbar />
      <SelectedProfilePage />
      {/* <Donation /> */}
    </div>
  );
}
