import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { LiaSteam, LiaPlaystation, LiaXbox, LiaAndroid, LiaApple } from 'react-icons/lia';
import { SiEpicgames, SiGogdotcom, SiNintendoswitch } from 'react-icons/si';
import axios from "axios";
import HomeHeader from './HomeHeader';

type GameInfoProps = {
  MakeReviewToggle: any,
  setGameName: any,
  setGameId: any,
  ShowReviewToggle: any,
}

export default function GameInfo({ MakeReviewToggle, setGameName, setGameId, ShowReviewToggle }: GameInfoProps) {
  const [info, setInfo] = useState<any>([]);
  const [gameBackground, setGameBackground] = useState<string>('');
  const [stores, setStores] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [publishers, setPublishers] = useState<any[]>([]);
  const background = 'gray-900';
  const opacity = 'opacity-80';
  const { id } = useParams();

  async function getGameInfo() {
    await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/games/${id}`)
      .then((res) => {
        setInfo(res.data)
        setGameBackground(res.data.background_image)
        setStores(res.data.stores)
        setGenres(res.data.genres)
        setGameId(res.data.id)
        setGameName(res.data.name)

        setPublishers(res.data.publishers)
      })
  }

  useEffect(() => {
    getGameInfo()
  }, [gameBackground, id])

  return (
    <>

      <div style={{ backgroundImage: `url(${info.background_image})` }} className={`Body w-full h-full flex flex-col items-center bg-cover bg-center bg-repeat-y overflow-y-hidden`}>
        <HomeHeader BackgroundColor={background} Opacity={opacity} />
        <div className='bg-gray-900 w-full h-screen bg-opacity-80 flex justify-center overflow-y-hidden'>
          <div className='BodyContainer flex flex-col'>
            <div className='TopContainer flex justify-end align-middle items-center mr-16'>
              <h1 className='GameTitle text-8xl font-serif text-gray-300 text-center mr-28'>{info.name}</h1>
              <div className='ReviewContainer flex flex-col mt-6 font-serif'>
                <div onClick={() => ShowReviewToggle(true)} className='ReviewCount flex justify-center bg-gbxd-50 w-[150px] h-8 mr-2 rounded-md font-serif text-gray-300 hover:text-black items-center mb-5 cursor-pointer  hover:bg-slate-200 ease-in-out duration-500'>
                  <h2 className='ReviewNumberText font-semibold text-[15px]'>Reviews</h2>
                </div>
                <div onClick={() => MakeReviewToggle(true)} className='MakeReview flex justify-center bg-gbxd-50 w-[150px] h-8 mr-2 rounded-md font-serif text-gray-300 items-center cursor-pointer hover:text-black hover:bg-slate-200 ease-in-out duration-500'>
                  <span className='Plus flex mr-2 font-bold text-[20px] mb-1'>+</span>
                  <h3 className='ReviewText font-semibold text-[15px]'>Make a Review</h3>
                </div>
              </div>
            </div>
            <div className='InfoContainer relative  flex w-auto'>
              <div className='DateContainer absolute flex justify-center bg-gbxd-50 w-[300px] h-8 mr-2 rounded-md font-serif text-gray-300 items-center'>
                Release date: {info.released}
              </div>
              <div className='StoreContainer bg-gbxd-50 w-[300px] h-auto opacity-90 rounded-md flex flex-col mr-40 mt-16'>
                <h1 className='StoreHeader flex justify-center mt-3 text-gray-200 text-[25px] font-semibold font-serif mb-2'>Where to play</h1>
                {stores.map((store) =>
                  <div key={store.id} className='StoreInfo flex items-center h-[50px] mb-2 justify-between cursor-pointer hover:bg-slate-500 ease-in-out duration-500 rounded-md'>
                    <a href={`//${store.store.domain}`} target="_blank" key={store.store.id} className='Store font-semibold text-[15px] ml-4 text-gray-200'>{store.store.name}</a>
                    {store.store.slug === "playstation-store" ?
                      <LiaPlaystation className="Icon h-9 w-9 fill-white mr-5" /> :
                      (store.store.slug === "steam" ?
                        <LiaSteam className="Icon h-9 w-9 fill-white mr-5" /> :
                        (store.store.slug === "epic-games" ?
                          <SiEpicgames className="Icon h-9 w-9 fill-white mr-5" /> :
                          (store.store.slug === "xbox-store" ?
                            <LiaXbox className="Icon h-9 w-9 fill-white mr-5" /> :
                            (store.store.slug === "apple-appstore" ?
                              <LiaApple className="Icon h-9 w-9 fill-white mr-5" /> :
                              (store.store.slug === "gog" ?
                                <SiGogdotcom className="Icon h-9 w-9 fill-white mr-5" /> :
                                (store.store.slug === "nintendo" ?
                                  <SiNintendoswitch className="Icon h-9 w-9 fill-white mr-5" /> :
                                  <LiaAndroid className="Icon h-9 w-9 fill-white mr-5" />
                                ))))))
                    }

                  </div>
                )}
              </div>
              <div className='BackgroundContainer flex flex-col mt-10 mr-28'>
                <img src={info.background_image} className='BackgroundImg w-[450px] h-[250px] mb-5' />
                <img src={info.background_image_additional} className='BackgroundImgAdd w-[450px] h-[250px]' />
              </div>
              <div dangerouslySetInnerHTML={{ __html: info.description }} className='GameDescription w-[400px] h-[200px] text-1xl font-serif text-gray-300 mt-10 text-justify' />
            </div>
            <div className='BottomContainer w-3/5 flex flew-row justify-between'>
              <div className='GenreContainer mt-14 flex flex-col h-auto'>
                <span className='GenreTitle font-serif text-gray-300 text-2xl font-bold mb-2'>Genres:</span>
                <div className='CardsContainer w-[270px] grid grid-cols-2 gap-4'>
                  {genres.map((genre) =>
                    <div key={genre.id} className='Genres bg-gbxd-50 w-32 h-12 mr-2 rounded-md font-serif text-gray-300 flex items-center'>
                      <div className='Genre ml-4'>{genre.name}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='PublishersContainer w-[400px] mt-14 h-auto'>
                <span className='PublisherTitle font-serif text-gray-300 text-2xl font-bold flex mb-2'>Publishers:</span>
                <div className='PublisherContainer w-[400px] flex'>
                  {publishers.map((publisher) =>
                    <div key={publisher.id} className='Publisher bg-gbxd-50 w-32 h-12 mr-2 rounded-md font-serif text-gray-300 flex items-center'>
                      <div className='PublisherName ml-2'>
                        {publisher.name}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}