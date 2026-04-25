const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 mt-20 py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* LOGO */}
        <div className="text-2xl font-bold text-black">
          Nevaro
        </div>

        {/* LINKS INSTITUCIONAIS */}
        <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-black transition-colors">About</a>
          <a href="#" className="hover:text-black transition-colors">Help and Contact</a>
          <a href="#" className="hover:text-black transition-colors">Community</a>
          <a href="#" className="hover:text-black transition-colors">Sell and Buy</a>
          <a href="#" className="hover:text-black transition-colors">Stay Connected</a>
        </nav>

        {/* SELETOR DE PAÍS */}
        <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
          {/* O retângulo cinza simula a bandeira do print */}
          <div className="w-8 h-5 bg-gray-300 rounded-sm"></div>
          <span className="text-sm font-medium text-gray-700">Morocco</span>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

      </div>
    </footer>
  );
};

export default Footer;