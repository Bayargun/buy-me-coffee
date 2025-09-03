import { YellowBack } from "../sign-up/components/YellowBack";
import { Login } from "./components/Login";

export default function Home() {
  return (
    <div className="w-screen h-screen flex">
      <YellowBack />
      <Login />
    </div>
  );
}
