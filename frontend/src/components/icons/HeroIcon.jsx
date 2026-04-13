import React from 'react';
import womenHero from '../../assets/womenHero.png'

const HeroIcon = ({ 
  imageUrl = womenHero, // Prop para trocar a imagem
  borderColor = "#FFB153",   // Prop para trocar a cor da borda
}) => {
  return (
    <div style={{ position: 'relative', width: '622px' }}>
      <svg 
        width="622" 
        height="522" 
        viewBox="0 0 622 522" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Camadas de fundo com opacidade */}
        <path d="M0 230.5C0 103.751 102.751 1 229.5 1C356.249 1 459 103.751 459 230.5V523H0V230.5Z" fill="#FFEFDD" fillOpacity="0.79"/>
        <path d="M230 229.5C230 102.751 332.751 0 459.5 0C586.249 0 689 102.751 689 229.5V522H230V229.5Z" fill="#FFEFDD" fillOpacity="0.79"/>
        
        {/* Onde a mágica acontece: O ClipPath corta a imagem no formato do path */}
        <defs>
          <clipPath id="myShape">
            <path d="M115 229.5C115 102.751 217.751 0 344.5 0C471.249 0 574 102.751 574 229.5V522H115V229.5Z" />
          </clipPath>
        </defs>

        {/* Renderizando a imagem dentro do recorte */}
        <image 
          href={imageUrl} 
          width="100%" 
          height="100%" 
          preserveAspectRatio="xMidYMid slice" 
          clipPath="url(#myShape)"
        />

        {/* Borda externa (Stroke) */}
        <path 
          d="M344.5 5C468.488 5 569 105.512 569 229.5V517H120V229.5C120 105.512 220.512 5 344.5 5Z" 
          stroke={borderColor} 
          strokeWidth="10"
        />
      </svg>
    </div>
  );
};

export default HeroIcon;