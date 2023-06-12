import Logo from '../assets/letterbox.png';

type BackgroundProps = {
  BackgroundColor: any,
  RegisterToggle: any, 
  LoginToggle: any,
}

export default function WelcomeHeader({BackgroundColor, RegisterToggle, LoginToggle}: BackgroundProps) {

  return (
    <div className={`header bg-${BackgroundColor} w-screen h-28 flex space-x-48 items-center`}>
      <div className='logo-container flex items-center'>
        <img src={Logo} className='logo h-28 w-28 ml-48' />
        <h1 className='title text-white text-5xl font-serif font-bold'>Gamerboxd</h1>
      </div>
      <div className='menu-container flex text-gray-200 font-serif font-bold text-2xl space-x-8'>
        <h1
          className='signin hover:text-white hover:cursor-pointer'
          onClick={() => LoginToggle(true)}
        >
          SIGN IN
        </h1>
        <h2 className='signup hover:text-white hover:cursor-pointer' onClick={() => RegisterToggle(true)}>CREATE ACCOUNT</h2>
        <h3 className='games hover:text-white hover:cursor-pointer'>GAMES</h3>
        <h4 className='lists hover:text-white hover:cursor-pointer'>LISTS</h4>
      </div>
    </div>
  )
}