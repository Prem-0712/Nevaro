import { useState } from "react";
import logo from "../assets/logo.png"


const LoginCard = () => {
    const [isLogin, setIsLogin] = useState(true);
      
      const [confirmPassword, setConfirmPassword] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { email, password, mode: isLogin ? 'Login' : 'Sign Up' });
    
  };
  
    return (
        
        <main className = "flex flex-col z-10 items-center mb-10 lg:mb-0">
            {/* Logo */}
        <div className="text-center mb-6">
          <img
          src = {logo}
          alt="logo"
          />
        </div>  

        {/* Toggle Switch */}
        <div className="flex justify-center mb-10 ">
          <div className="bg-gray-100 rounded-full  flex shadow-lg shadow-black/30">
            <button 
              onClick={() => setIsLogin(false)}
              className={`${!isLogin ? 'bg-black text-white ' : 'text-black'} px-6 py-2 rounded-full text-sm font-medium transition-all`}
            >
              Sign in
            </button>
            <button 
              onClick={() => setIsLogin(true)}
              className={`${isLogin ? 'bg-black text-white' : 'text-black'} px-6 py-2 rounded-full text-sm font-medium transition-all`}
            >
              Log in
            </button>
          </div>
        </div>

        {/* Main Card */}
    <div className="bg-white p-10 rounded-3xl shadow-2xl w-full  max-w-lg ">
        
        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 bg-gray-50 rounded-lg border border-black  focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 bg-gray-50 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          {!isLogin && (
    <input 
      type="password" 
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="w-full h-12 px-4 bg-gray-50 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
      required
    />
    
  )}
  <div className = "flex justify-between ">
    <div className = "flex items-center gap-1">
    <input 
    type="checkbox"
    id="remember"
    
    className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-500"
  />
  <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
    Remember me
  </label>
  </div>
  {isLogin && (
    <a className = "text-blue-600 hover:underline">
    Forgot my Password
  </a>
  )}
  

  </div>
          
          <button 
            type="submit"
            className="w-full h-12 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            {isLogin ? 'Log In' : 'Sign In'}
          </button>
          {!isLogin && (
            <div className = "flex flex-col items-center gap-4">
              <p className = "font-bold">
                or
              </p>
              <button className = "w-full h-12 px-4 bg-gray-50 rounded-lg border border-black  focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <h1>
                   Sign in with Google
                </h1>
              </button>
            </div>
          )}
        </form>
      </div>
        </main>
      

      
    
    )
    
}
export default LoginCard;