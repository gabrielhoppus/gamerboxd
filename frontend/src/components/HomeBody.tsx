import useInfo from "../hooks/useInfo";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeHeader from "./HomeHeader";

export default function HomeBody() {
  const user = useInfo();
  const navigate = useNavigate();
  const [popular, setPopular] = useState<any[]>([]);
  const background = '[#1D232A]'
  const opacity = 'opacity-100'

  async function getPopularGames() {
    await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/games/popular`)
      .then((res) => {
        setPopular(res.data);
      })
  }

  const handleClick = (id: any) => {
    navigate(`/games/${id}`);
  }

  useEffect(() => {
    getPopularGames()
  }, [])

  return (
    <>
      <div className="Body bg-gray-900 w-auto h-auto flex flex-col items-center">
        <HomeHeader BackgroundColor={background} Opacity={opacity} />
        <a href="https://diablo4.blizzard.com/pt-br/" target="_blank" className="BannerContainer w-[1200px] h-[200px] bg-white mt-16 bg-[url('/d4.png')] bg-no-repeat bg-center flex cursor-pointer" />
        <div className="WelcomeMessage title text-white text-5xl font-serif font-bold text-center mt-9">Welcome back, {user.name}.<br></br> Here's what we've been gaming...</div>
        <div className="NewContainer w-[1200px] flex items-start flex-col">
          <div className="NewGames title text-gray-300 text-2xl font-serif mt-9">NEW ON GAMERBOXD</div>
          <span className="Line h-[0.4px] w-[1200px] bg-gray-500 mt-2"></span>
          <div className="NewGamesContainer w-[1200px] flex flex-row space-x-8 justify-center ">
            {popular.map((game) => (
              <div key={game.id} className="GameContainer w-[280px] h-[430px] mt-4 rounded-md bg-gray-600">
                <img src={game.background_image} onClick={() => handleClick(game.id)} className="Game rounded-t-md w-[280px] h-[400px] object-cover cursor-pointer" />
                <div className="Title text-gray-300 text-1xl font-bold font-mono ml-2 mt-1">
                  <span className="GameTitle cursor-pointer">
                    {game.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <a href="https://sociogigante.com" target="_blank" className="BecomePro w-[1200px] h-[126px] bg-white mt-16 mb-10 bg-[url('/pro-950.png')] bg-no-repeat bg-cover flex" />
      </div>
    </>
  )
}