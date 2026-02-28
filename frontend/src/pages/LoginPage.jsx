import LoginCard from '../components/LoginCard';
import logoBag1 from '../assets/logoBag1.png';
import logoBag2 from '../assets/logoBag2.png';
import normalBag from '../assets/normalBag.png';
import yellowBackground from '../assets/yellowBackground.png';

const LoginPage = () => {
return (
<main className = "grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-[#FAD93D]">
    <div className="absolute inset-0 z-0">
        <img 
          src={yellowBackground} 
          alt="Background" 
          className="h-full w-full object-cover" 
        />
      </div>
  <div className="flex items-center justify-center p-8">
     <LoginCard />
  </div>
  <div className="relative hidden lg:block h-screen w-full overflow-hidden">
    <img 
    src={logoBag1} 
    alt="bag-1"
    className="absolute top-[-10%] right-[30%] rotate-[40deg] z-10" 
  />
    <img  
    src = {logoBag2}
    alt="bag-2"
    className = "absolute top-[-3%] right-[-25%] -rotate-[10deg] z-20"
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
export default LoginPage;   

