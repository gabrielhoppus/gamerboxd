import { useState } from "react";

import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import WelcomeHeader from "../components/WelcomeHeader";

export default function Welcome() {
  const [showLogin, setShowLogin] = useState<any>(false);
  const [showRegister, setShowRegister] = useState<any>(false);
  const [background, setHeaderBackground] = useState<any>('transparent')

  return (
    <>
      <div className="App w-screen h-screen bg-[url('/elden-ring.jpg')] bg-cover bg-no-repeat flex flex-col">
        <WelcomeHeader BackgroundColor={background} RegisterToggle={setShowRegister} LoginToggle={setShowLogin} />
        <h2 className="summary w-screen h-screen text-white font-serif font-bold text-5xl flex place-items-center justify-center">
          Track games you've played.
          <br />Save those you want to play.
          <br />Tell your friends what's good.
        </h2>
      </div>
      <LoginModal LoginVisible={showLogin} setHeaderBackground={setHeaderBackground} onClose={() => setShowLogin(false)} />
      <RegisterModal RegisterVisible={showRegister} onClose={() => setShowRegister(false)} />
    </>
  )
}