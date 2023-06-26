import axios from "axios";
import { useState, useEffect } from "react";

type ReviewProps = {
  ShowReviewsVisible: any,
  onClose: any,
  gameName: any,
  gameId: any,
}

export default function ReviewsModal({ ShowReviewsVisible, onClose, gameName, gameId }: ReviewProps) {
  if (!ShowReviewsVisible) return null;
  const [reviews, setReviews] = useState<any[]>([])

  async function getReviewByGame() {
    await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/reviews/${gameId}`)
      .then((res) => {
        setReviews(res.data)
      })
  }

  useEffect(() => {
    getReviewByGame()
  }, [])

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-25 backdrop-blur-sm overflow-y-auto h-full w-full flex justify-center items-center"
      id="my-modal"
    >
      <div className="flex flex-col">
        <div className="exit text-white text-2xl flex justify-end cursor-default" onClick={() => onClose()}>
          x
        </div>
        <div className="w-[600px] h-[710px] bg-[#14181C] flex align-middle items-center flex-col overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <p className="mt-[30px] flex justify-center text-white text-3xl">{gameName}</p>
          <div className="ReviewsContainer w-[500px] mt-6 ">
            {reviews.map((review) =>
              <div className="ReviewContainer flex flex-col mb-6  bg-gray-600 rounded-md">
                <div className="UserInfoContainer flex items-center ml-4 mt-4">
                  <img src={review.User.image} className="UserIcon rounded-full bg-white h-[40px] w-[40px]" />
                  <h2 className="UserName ml-2 font-serif text-gray-300 text-2xl">{review.User.name}</h2>
                </div>
                <div className="DescriptionContainer flex justify-between mb-4 mt-4">
                  <div className="Grade ml-6 font-serif text-2xl text-gray-300">Rating: {review.grade} </div>
                  <div className="Description mr-14 font-serif text-2xl text-gray-300">{review.review}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}