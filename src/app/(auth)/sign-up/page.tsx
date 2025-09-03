import { Email } from "./components/CreateEmail";

import { YellowBack } from "./components/YellowBack";

export default function Home() {
  return (
    <div className="w-screen h-screen flex">
      <YellowBack />
      <Email />
    </div>
  );
}
