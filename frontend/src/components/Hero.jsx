import HeroIcon from "./icons/HeroIcon";

const Hero = () => {
    return (
        <div className = "bg-[#FFAB40] h-135.5 w-315.25 rounded-2xl mt-10 flex justify-between ">
                <div className= "flex flex-col gap-5 justify-center mx-auto mb-20 items-start">
                    <h1 className = "font-semibold text-5xl ">
                            Power Up Your Savings
                    </h1>
                    <p className = "text-[23px] ">
                        Offers up to 80% Discount 
                    </p>
                    <button className = "rounded-full py-2 px-4 bg-black">
                        <h1 className = "text-white font-semibold">
                            Explore more
                        </h1>
                        
                    </button>

                </div>
                <div className = "mt-5.25">
                    <HeroIcon />
                </div>
               
            
           
            </div>
    );
};
export default Hero;