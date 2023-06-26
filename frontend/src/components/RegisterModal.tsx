import { useState } from "react";
import axios from "axios";

type RegisterProps = {
  RegisterVisible: any,
  onClose: any,
}

export default function RegisterModal({ RegisterVisible, onClose }: RegisterProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  
  if (!RegisterVisible) return null;

  function userSignup(e: any){
    e.preventDefault();
    const body = { name, email, image, password, confirmation: confirmPassword };
    axios.post(`http://localhost:5000/users/signup`, body)
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        setName('');
        setEmail('');
        setImage('');
        setPassword('');
        setConfirmPassword('');
        onClose();
      })
      .catch((err) => {
        alert(err.message);
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
        <form onSubmit={userSignup} className="w-[600px] h-[710px] bg-[#14181C]">
          <p className="mt-[30px] flex justify-center text-white text-3xl">REGISTER NOW</p>
          <div className="mt-[30px] flex flex-col ml-[50px]">
            <label htmlFor='name' className="text-white text-1xl">Name</label>
            <input
              type="text"
              id="name"
              className="mt-[10px] w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required />
          </div>
          <div className="mt-[30px] flex flex-col ml-[50px]">
            <label htmlFor='email' className="text-white text-1xl">Email</label>
            <input
              type="text"
              id="email"
              className="mt-[10px] w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required />
          </div>
          <div className="mt-[30px] flex flex-col ml-[50px]">
            <label htmlFor='image' className="text-white text-1xl">Image</label>
            <input
              type="text"
              id="image"
              className="mt-[10px] w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Image"
              value={image}
              onChange={e => setImage(e.target.value)}
              required />
          </div>
          <div className="mt-[30px] flex flex-col ml-[50px]">
            <label htmlFor='password' className="text-white text-1xl">Password</label>
            <input
              type="password"
              id="password"
              className="mt-[10px] w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required />
          </div>
          <div className="mt-[30px] flex flex-col ml-[50px]">
            <label htmlFor='confirm-password' className="text-white text-1xl">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              className="mt-[10px] w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required />
          </div>
          <div className="flex justify-center mt-[30px]">
            <button type="submit" className="hover:text-purple-800 hover:cursor-pointer bg-[#1C2128] rounded-lg h-[50px] w-[150px] flex justify-center items-center text-white text-2xl">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}