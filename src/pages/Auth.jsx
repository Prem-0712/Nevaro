import logoBag1 from '../assets/logoBag1.png';
import logoBag2 from '../assets/logoBag2.png';
import normalBag from '../assets/normalBag.png';
import yellowBackground from '../assets/yellowBackground.png';
import LoginCard from '../components/LoginCard';
import RegisterCard from '../components/RegisterCard';
import { useState } from 'react';
import Logo from '../components/icons/Logo';
import { useToggleContext } from '../context/ToggleContext';

const Auth = () => {
  
  const {isLogin, setIsLogin} = useToggleContext();

return (
<main className = "overflow-hidden grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-[#FAD93D]">
    <div className="absolute inset-0 z-0">
        <img 
          src={yellowBackground} 
          alt="Background" 
          className="h-full w-full object-cover" 
        />
      </div>
      <div className = "flex flex-col gap-3 z-999  justify-center">
      
        <div className="flex text-center justify-center">
              <Logo />
            </div>
            {/* Toggle Switch */}
      <div className="flex justify-center  ">
        <div className="bg-gray-100 rounded-full flex shadow-lg shadow-black/30 ">
          <button
            onClick={() => { setIsLogin(false); setErrors({}); setSuccess(""); }}
            className={`${!isLogin ? "bg-black text-white" : "text-black"} px-6 py-2 rounded-full text-sm font-medium transition-all`}
          >
            Sign in
          </button>
          <button
            onClick={() => { setIsLogin(true); setErrors({}); setSuccess(""); }}
            className={`${isLogin ? "bg-black text-white" : "text-black"} px-6 py-2 rounded-full text-sm font-medium transition-all`}
          >
            Log in
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
          {isLogin ? (
            <LoginCard />
          ) : (
            <RegisterCard />
          )}
        </div>
      </div>
  

  <div className="relative hidden lg:block h-screen w-full overflow-hidden">
    <img 
    src={logoBag1} 
    alt="bag-1"
    
    className="absolute top-[-10%] right-[30%] rotate-40 z-10" 
  />
  
    <img  
    src = {logoBag2}
    alt="bag-2"
    className = "absolute top-[-3%] right-[-25%] -rotate-10 z-20"
    />
    <img  
    src = {normalBag}
    alt="bag-3"
    className = "absolute bottom-[-10%] right-[10%] rotate-[-15deg] z-10"
    />

  </div>
    </main>
);

};
export default Auth;   

