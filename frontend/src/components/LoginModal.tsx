import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

type LoginProps = {
  LoginVisible: any,
  onClose: any,
  setHeaderBackground: any,
}

export default function LoginModal({ LoginVisible, onClose, setHeaderBackground }: LoginProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  if (!LoginVisible) return null;

  async function userSignin(e: any) {
    e.preventDefault();
    const body = { email, password };
    await axios.post(`http://localhost:5000/users/signin`, body)
      .then((res) => {
        setUserData(res.data)
        alert("Login realizado com sucesso!");
        onClose();
        setEmail('');
        setPassword('');
        setHeaderBackground('gbxd-50');
        navigate('/home');
      })
      .catch((err) => {
        alert(err.message);
        onClose();
      })
  }

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-25 backdrop-blur-sm overflow-y-auto h-full w-full flex justify-center items-center"
      id="my-modal"
    >
      <div className="flex flex-col">
        <div className="exit text-white text-2xl flex justify-end" onClick={() => onClose()}>
          x
        </div>

        <form onSubmit={userSignin} className="w-[600px] h-[400px] bg-[#14181C]">
          <p className="mt-[30px] flex justify-center text-white text-3xl">LOGIN</p>
          <div className="mt-[30px] flex flex-col ml-[50px]">
            <label htmlFor='name' className="text-white text-1xl">Email</label>
            <input
              type="email"
              id="email"
              className="mt-[10px] w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required />
          </div>
          <div className="mt-[30px] flex flex-col ml-[50px]">
            <label htmlFor='name' className="text-white text-1xl">Password</label>
            <input
              type="password"
              id="password"
              className="mt-[10px] w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required />
          </div>
          <div className="flex justify-center mt-[30px]">
            <button type="submit" className="hover:text-purple-800 hover:cursor-pointer bg-[#1C2128] rounded-lg h-[50px] w-[150px] flex justify-center items-center text-white text-2xl">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}