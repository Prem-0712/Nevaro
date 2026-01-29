import { useEffect, useState } from 'react';
import bgImage from '../assets/background-login.jpeg';
import logo from '../assets/logo.png';

const App = () => {
  return (
    <div 
      className="min-h-screen w-full pl-28 pt-20 flex flex-cols items-center justify-start bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }} 
    >
<div className = "flex flex-col items-center gap-10">
    <img   
    src = {logo}
    className = "w-48"
    />
  <button>
  sign in sign 
  </button>
  <div className = "bg-white rounded-2xl px-64 py-72 shadow-2xl flex flex-col justify-start gap-4">

<input type="email"
 placeholder="Enter e-mail"
  className="w-full px-5 py-4 border-2 border-gray-400 rounded-2xl focus:outline-none focus:border-yellow-500 placeholder-gray-500">
    
  </input>
  <input type="email"
 placeholder="Enter e-mail"
  className="w-full px-5 py-4 border-2 border-gray-400 rounded-2xl focus:outline-none focus:border-yellow-500 placeholder-gray-500">
    
  </input>
  <input type="email"
 placeholder="Enter e-mail"
  className="w-full px-5 py-4 border-2 border-gray-400 rounded-2xl focus:outline-none focus:border-yellow-500 placeholder-gray-500">
    
  </input>
    

  </div>
  </div>
      </div>
  );
}

export default App;