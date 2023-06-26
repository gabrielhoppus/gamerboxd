import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { LiaSteam, LiaPlaystation, LiaXbox, LiaAndroid, LiaApple } from 'react-icons/lia';
import { SiEpicgames, SiGogdotcom, SiNintendoswitch } from 'react-icons/si';
import axios from "axios";
import HomeHeader from './HomeHeader';

export default function GameInfo() {
  const [info, setInfo] = useState<any>([]);
  const [gameBackground, setGameBackground] = useState<string>('');
  const [stores, setStores] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [publishers, setPublishers] = useState<any[]>([]);
  const background = 'gray-900';
  const opacity = 'opacity-80';
  const { id } = useParams();

  async function getGameInfo() {
    await axios.get(`http://localhost:5000/games/${id}`)
      .then((res) => {
        setInfo(res.data)
        setGameBackground(res.data.background_image)
        setStores(res.data.stores)
        setGenres(res.data.genres)
        setPublishers(res.data.publishers)
      })
  }

  useEffect(() => {
    getGameInfo()
  }, [gameBackground])

  return (
    <>

      <div style={{ backgroundImage: `url(${info.background_image})` }} className={`Body w-full h-full flex flex-col items-center bg-cover bg-center bg-repeat-y overflow-y-hidden`}>
        <HomeHeader BackgroundColor={background} Opacity={opacity} />
        <div className='bg-gray-900 w-full h-screen bg-opacity-80 flex justify-center overflow-y-hidden'>
          <div className='BodyContainer flex flex-col'>
            <h1 className='GameTitle text-8xl font-serif text-gray-300 text-center mr-28'>{info.name}</h1>
            <div className='InfoContainer  flex w-auto'>
              <div className='StoreContainer bg-gbxd-50 w-[300px] h-auto opacity-90 rounded-md flex flex-col mr-40 mt-10'>
                <h1 className='StoreHeader flex justify-center mt-3 text-gray-200 text-[25px] font-semibold font-serif mb-2'>Where to play</h1>
                {stores.map((store) =>
                  <div className='StoreInfo flex items-center h-[50px] mb-2 justify-between cursor-pointer hover:bg-slate-500 ease-in-out duration-500 rounded-md'>
                    <a href={`//${store.store.domain}`} target="_blank" key={store.store.id} className='Store font-semibold text-[15px] ml-4 text-gray-200'>{store.store.name}</a>
                    {store.store.slug === "playstation-store" ?
                      <LiaPlaystation class="Icon h-9 w-9 fill-white mr-5" /> :
                      (store.store.slug === "steam" ?
                        <LiaSteam class="Icon h-9 w-9 fill-white mr-5" /> :
                        (store.store.slug === "epic-games" ?
                          <SiEpicgames class="Icon h-9 w-9 fill-white mr-5" /> :
                          (store.store.slug === "xbox-store" ?
                            <LiaXbox class="Icon h-9 w-9 fill-white mr-5" /> :
                            (store.store.slug === "apple-appstore" ?
                              <LiaApple class="Icon h-9 w-9 fill-white mr-5" /> :
                              (store.store.slug === "gog" ?
                                <SiGogdotcom class="Icon h-9 w-9 fill-white mr-5" /> :
                                (store.store.slug === "nintendo" ?
                                  <SiNintendoswitch class="Icon h-9 w-9 fill-white mr-5" /> :
                                  <LiaAndroid class="Icon h-9 w-9 fill-white mr-5" />
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
            <div className='BottomContainer flex'>
              <div className='GenreContainer mt-14 flex flex-col h-auto'>
                <span className='GenreTitle font-serif text-gray-300 text-2xl font-bold mb-2'>Genres:</span>
                <div className='CardsContainer w-[270px] grid grid-cols-2 gap-4'>
                  {genres.map((genre) =>
                    <div className='Genres bg-gbxd-50 w-32 h-12 mr-2 rounded-md font-serif text-gray-300 flex items-center'>
                      <div className='Genre ml-4'>{genre.name}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='PublishersContainer w-[400px] mt-14 flex-col h-auto ml-[220px]'>
                <span className='GenreTitle font-serif text-gray-300 text-2xl font-bold mb-2'>Publishers:</span>
                <div className='PublisherContainer w-[400px] grid grid-cols-2 gap-4'>
                  {publishers.map((publisher) =>
                    <div className='Publisher bg-gbxd-50 w-32 h-12 mr-2 rounded-md font-serif text-gray-300 flex items-center'>
                      <div className='PublisherName ml-2'>
                        {publisher.name}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='DateContainer absolute top-48 left-[220px] flex justify-center bg-gbxd-50 w-[300px] h-12 mr-2 rounded-md font-serif text-gray-300 items-center'>
              Release date: {info.released}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}