const ProductCard = ({image, title, price, oldPrice}) => {
    return (
        // Removemos o overflow-hidden daqui pra o botão poder "respirar" se precisar
        <div className="flex flex-col w-80 gap-3 group"> 
            
            {/* 1. CONTAINER DA IMAGEM: Ocupa a parte de cima */}
            <div className="relative overflow-hidden rounded-2xl h-60 w-full bg-[#F5F5F7]">
                <img 
                    src={image}
                    alt={title}
                    
                    className="h-50 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* 2. INFOS: Ficam embaixo da imagem */}
            <div className="flex flex-col gap-1 px-1 ">
                <h3 className="text-lg font-medium text-[#1D1D1F] truncate">
                    {title}
                </h3>
                
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-[#1D1D1F]">
                        {price}
                    </span>
                    <span className="text-gray-400 text-sm line-through">
                        {oldPrice}
                    </span>
                </div>

                {/* 3. BOTÃO: Amarelo e arredondado como no design */}
                <button className="bg-[#FFD640] hover:bg-[#ffcc00] transition-colors rounded-full w-12 h-8 flex items-center justify-center mt-2">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                    </svg>
                </button>
            </div>
        </div>
    )
};
export default ProductCard;