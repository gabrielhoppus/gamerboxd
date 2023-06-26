import useInfo from "../hooks/useInfo";
import Logo from '../assets/letterbox.png';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

type BackgroundProps = {
  BackgroundColor: any,
  Opacity: any
}

export default function HomeHeader({ BackgroundColor, Opacity }: BackgroundProps) {
  const user = useInfo();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [games, setGames] = useState<any>([]);
  const [visible, setVisible] = useState<any>('invisible');


  const handleClickHome = () => {
    navigate('/home');
  }

  const handleClickGame = (id: any) => {
    setVisible('invisible')
    setTitle('')
    navigate(`/games/${id}`)
  }

  function searchGames() {
    if (title.length > 3) {
      setVisible('visible')
      axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/games/game/${title}`)
        .then((res) => {
          setGames(res.data);
        })
    }
  }

  useEffect(() => {
    setGames([]);
    searchGames()
  }, [title])

  return (
    <div className={`header bg-${BackgroundColor} w-full h-28 flex space-x-48 items-center bg-${Opacity}`}>
      <div onClick={handleClickHome} className='logo-container w-[250px] flex items-center ml-32 cursor-pointer'>
        <img src={Logo} className='logo h-28 w-28' />
        <h1 className='title text-white text-5xl font-serif font-bold'>Gamerboxd</h1>
      </div>
      <div className='menu-container flex text-gray-200 font-serif font-bold text-2xl space-x-8 items-center'>
        <div className="Search mb-[10px] relative flex flex-col ml-8 mr-12">
          <input
            type="text"
            id="game"
            className="mt-[10px] w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search games"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required />
          <div className={`Suggestions ${visible} absolute w-[500px] h-[265px] bg-gray-700 border border-gray-600 text-gray-900 rounded-b-lg  inset-y-12`}>
            {games.map((game: any) =>
              <div onClick={() => handleClickGame(game.id)} key={game.id} className="SuggestionContainer h-[45px] flex flex-row mt-4 mb-4 bg-gray-600 rounded-md align-middle items-center cursor-pointer">
                <img className="GamePoster bg-cover w-[40px] h-[40px] rounded-full ml-4" src={game.background_image} />
                <div className="GameName text-white text-1xl ml-4">{game.name}</div>
              </div>
            )}
          </div>
        </div>
        <div className="UserContainer flex items-center cursor-pointer">
          <img src={user.image} className='avatar h-14 w-14 rounded-full bg-white' />
          <h5 className='user hover:text-white hover:cursor-pointer ml-6'>
            {user.name}
          </h5>
        </div>
      </div>
    </div>
  )
}