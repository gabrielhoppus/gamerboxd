import useInfo from "../hooks/useInfo";
import Celeste from "../../public/Celeste.png"
import Diablo from "../../public/Diablo4.png"
import EldenRing from "../../public/EldenRing.png"
import HK from "../../public/HK.png"

export default function HomeBody() {
  const user = useInfo();

  return (
    <>
      <div className="Body bg-gray-900 w-auto h-auto flex flex-col items-center">
        <div className="BannerContainer w-[1200px] h-[200px] bg-white mt-16 bg-[url('/d4.png')] bg-no-repeat bg-center flex" />
        <div className="WelcomeMessage title text-white text-5xl font-serif font-bold text-center mt-9">Welcome back, {user.name}.<br></br> Here's what we've been gaming...</div>
        <div className="NewContainer w-[1200px] flex items-start flex-col">
          <div className="NewGames title text-gray-300 text-2xl font-serif mt-9">NEW ON GAMERBOXD</div>
          <span className="Line h-[0.4px] w-[1200px] bg-gray-500 mt-2"></span>
          <div className="NewGamesContainer w-[1200px] flex flex-row space-x-8 justify-center ">
            <div className="GameContainer w-[280px] h-[430px] mt-4 rounded-md bg-gray-600">
              <img src={Celeste} className="Game rounded-t-md w-[280px] h-[400px]"/>
              <div className="Title text-gray-300 text-1xl font-bold font-mono ml-2"> Celeste</div>
            </div>
            <div className="GameContainer w-[280px] h-[430px] mt-4 rounded-md bg-gray-600">
              <img src={Diablo} className="Game rounded-t-md h-[400px]"/>
              <div className="Title text-gray-300 text-1xl font-bold font-mono ml-2"> Diablo 4</div>
            </div>
            <div className="GameContainer w-[280px] h-[430px] mt-4 rounded-md bg-gray-600">
              <img src={EldenRing} className="Game rounded-t-md h-[400px]"/>
              <div className="Title text-gray-300 text-1xl font-bold font-mono ml-2"> Elden Ring</div>
            </div>
            <div className="GameContainer w-[280px] h-[430px] mt-4 rounded-md bg-gray-600">
              <img src={HK} className="Game rounded-t-md h-[400px]"/>
              <div className="Title text-gray-300 text-1xl font-bold font-mono ml-2"> Hollow Knight</div>
            </div>
          </div>
        </div>

        <div className="BecomePro w-[1200px] h-[126px] bg-white mt-16 mb-10 bg-[url('/pro-950.png')] bg-no-repeat bg-cover flex" />
      </div>
    </>
  )
}