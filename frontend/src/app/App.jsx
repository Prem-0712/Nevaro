import { useState } from 'react';

export default function App() {
  // 1. State to toggle between Sign In and Log In
  const [isLogin, setIsLogin] = useState(true);
  
  // 2. State to capture user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { email, password, mode: isLogin ? 'Login' : 'Sign Up' });
    // Future step: Connect to your Django backend here
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-10 right-10">
        <div className="w-20 h-20 bg-yellow-500 rounded-full opacity-50"></div>
      </div>

      {/* Main Card */}
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md z-10">
        
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-tighter">NEVARO</h1>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <button 
              onClick={() => setIsLogin(false)}
              className={`${!isLogin ? 'bg-black text-white' : 'text-gray-500'} px-6 py-2 rounded-full text-sm font-medium transition-all`}
            >
              Sign in
            </button>
            <button 
              onClick={() => setIsLogin(true)}
              className={`${isLogin ? 'bg-black text-white' : 'text-gray-500'} px-6 py-2 rounded-full text-sm font-medium transition-all`}
            >
              Log in
            </button>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          
          <button 
            type="submit"
            className="w-full h-12 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            {isLogin ? 'Log In' : 'Sign In'}
          </button>
        </form>
      </div>

      {/* Bottom Right Icon Decoration */}
      <div className="absolute bottom-6 right-6">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
           <span className="text-xs">🧠</span>
        </div>
      </div>
    </div>
  );
}