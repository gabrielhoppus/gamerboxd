import useInfo from "../hooks/useInfo";
import Logo from '../assets/letterbox.png';

export default function HomeHeader() {

  const user = useInfo();

  return (
    <div className={`header bg-[#1D232A] w-screen h-28 flex space-x-48 items-center`}>
      <div className='logo-container flex items-center'>
        <img src={Logo} className='logo h-28 w-28 ml-48' />
        <h1 className='title text-white text-5xl font-serif font-bold'>Gamerboxd</h1>
      </div>
      <div className='menu-container flex text-gray-200 font-serif font-bold text-2xl space-x-8 items-center'>
        <img src={user.image} className='avatar h-14 w-14 rounded-full bg-white'/>
        <h5 className='user hover:text-white hover:cursor-pointer'>
          {user.name}
        </h5>
        <div>|</div>
        <h1
          className='games hover:text-white hover:cursor-pointer'
        >
          GAMES
        </h1>
        <h2 className='lists hover:text-white hover:cursor-pointer'>LISTS</h2>
        <h3 className='members hover:text-white hover:cursor-pointer'>MEMBERS</h3>
        <h4 className='journal hover:text-white hover:cursor-pointer'>JOURNAL</h4>
        <div className="Search mb-[10px] flex flex-col ml-[50px]">
            <input
              type="text"
              id="game"
              className="mt-[10px] w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search games"
              value={''}
              required />
          </div>
      </div>
    </div>
  )
}