import { useState } from "react";
import axios from "axios";
import useToken from "../hooks/useToken";

type ReviewProps = {
  MakeReviewVisible: any,
  onClose: any,
  gameName: any,
  gameId: any,
}

export default function MakeReviewModal({ MakeReviewVisible, onClose, gameName, gameId }: ReviewProps) {
  const [text, setText] = useState<string>('');
  const [grade, setGrade] = useState<number>(0);
  const token = useToken();
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};
  if (!MakeReviewVisible) return null;

  function postReview(e: any){
    e.preventDefault();
    const body = {review: text, grade}
    axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/reviews/add/${gameId}`, body, config)
      .then(() => {
        alert("Review cadastrado com sucesso!");
        setText('');
        setGrade(0);
        onClose();
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-25 backdrop-blur-sm overflow-y-auto h-full w-full flex justify-center items-center"
      id="my-modal"
    >
      <div className="flex flex-col">
        <div className="exit text-white text-2xl flex justify-end cursor-default" onClick={() => onClose()}>
          x
        </div>
        <form onSubmit={postReview} className="w-[600px] h-[710px] bg-[#14181C]">
          <p className="mt-[30px] flex justify-center text-white text-3xl">{gameName}</p>
          <div className="mt-[30px] flex flex-col ml-[50px]">
            <label htmlFor='review' className="text-white text-1xl">Review:</label>
            <textarea
              id="review"
              className=" resize-none mt-[10px] w-[500px] h-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Review Description"
              value={text}
              onChange={e => setText(e.target.value)}
              required />
          </div>
          <div className="mt-[30px] flex flex-col ml-[50px]">
            <label htmlFor='name' className="text-white text-1xl">Rating:</label>
            <select onChange={e => setGrade(parseInt(e.target.value))}  className="block appearance-none w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option value="0">0</option>
              <option value="0.5">0.5</option>
              <option value="1">1.0</option>
              <option value="1.5">1.5</option>
              <option value="2">2.0</option>
              <option value="2.5">2.5</option>
              <option value="3">3.0</option>
              <option value="3.5">3.5</option>
              <option value="4">4.0</option>
              <option value="4.5">4.5</option>
              <option value="5">5.0</option>
            </select>
          </div>
          <div className="flex justify-center mt-[30px]">
            <button type="submit" className="hover:text-purple-800 hover:cursor-pointer bg-[#1C2128] rounded-lg h-[50px] w-[250px] flex justify-center items-center text-white text-2xl">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}