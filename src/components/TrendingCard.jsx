const TrendingCard = ({title, category, image}) => {
    return (
        <div className="flex flex-col items-start gap-4"> 
            <p className="text-gray-400 text-sm font-medium">
                {category}
            </p>
            
            
            <div className="relative flex flex-col justify-center p-6 rounded-3xl h-60 w-125 overflow-hidden group cursor-pointer">
                
                
                <img   
                    src={image}
                    alt={title}
                    className="absolute right-0 bottom-0 h-full w-full object-cover z-0 transition-transform duration-300 group-hover:scale-105"
                />

                
                <div className="relative z-10 flex flex-col gap-4">
                    <h1 className="font-bold text-xl max-w-[160px] leading-tight">
                        {title}
                    </h1>
                    <button className="bg-transparent text-black py-2 px-4 border border-black rounded-full w-fit text-sm font-semibold hover:bg-black hover:text-white transition-colors">
                        Explore more
                    </button>
                </div>

            </div>
        </div>
    );
};
export default TrendingCard;