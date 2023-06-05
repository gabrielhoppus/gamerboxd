import { useState } from "react";
import Logo from './assets/letterbox.png';
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";

export default function App() {
  const [background] = useState<any>('transparent') //#1D242B
  const [showLogin, setShowLogin] = useState<any>(false);
  const [showRegister, setShowRegister] = useState<any>(false);

  return (
    <>
      <div className="App w-screen h-screen bg-[url('/elden-ring.jpg')] bg-cover bg-no-repeat flex flex-col">
        <div className={`header bg-[${background}] w-screen h-28 flex space-x-48 items-center`}>
          <div className='logo-container flex items-center'>
            <img src={Logo} className='logo h-28 w-28 ml-48' />
            <h1 className='title text-white text-5xl font-serif font-bold'>Gamerboxd</h1>
          </div>
          <div className='menu-container flex text-gray-200 font-serif font-bold text-2xl space-x-8'>
            <h1
              className='signin hover:text-white hover:cursor-pointer'
              onClick={() => setShowLogin(true)}
            >
              SIGN IN
            </h1>
            <h2 className='signup hover:text-white hover:cursor-pointer' onClick={() => setShowRegister(true)}>CREATE ACCOUNT</h2>
            <h3 className='games hover:text-white hover:cursor-pointer'>GAMES</h3>
            <h4 className='lists hover:text-white hover:cursor-pointer'>LISTS</h4>
          </div>
        </div>
        <h2 className="summary w-screen h-screen text-white font-serif font-bold text-5xl flex place-items-center justify-center">
          Track games you've played.
          <br />Save those you want to play.
          <br />Tell your friends what's good.
        </h2>
      </div>
      <LoginModal LoginVisible={showLogin} onClose={() => setShowLogin(false)}/>
      <RegisterModal RegisterVisible={showRegister} onClose={() => setShowRegister(false)}/>
    </>
  )
}