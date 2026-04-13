import Logo from "./icons/Logo.jsx"

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Categories', path: '/categories' },
  { name: 'Deals', path: '/deals' },
  { name: 'About', path: '/about' },
];




const Navbar = () => {
    return (
        <nav className = "flex flex-col w-full ">
        <div className="sticky top-0 z-50 w-full bg-white/80 border border-gray-300 px-6 py-3 flex justify-between">
            
            {/* first half (logo, pages and search button) */}

            <div className="max-w-7xl  flex items-center justify-start gap-24">

                {/* Logo and pages */}

                <div className="flex gap-21 items-center">
                    <Logo className="w-24"/>
                    <div className="flex gap-9">
                    {navLinks.map((link, index) => (                     
                            <a
                            key={index}
                            href={link.path}
                            className="hover:text-gray-600 transition-colors"  
                            >
                                {link.name}
                            </a>
                        
                    ))}
                    </div>
                </div>

                {/* search button */}

                <div className="relative w-200 ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-black">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    
                    <input 
                        type="text" 
                        placeholder="Search Products..." 
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-400 rounded-2xl text-sm  "
                    />
                </div>
            </div>

            {/* second half (icons) */}

            <div className = "flex gap-5 items-center ">

            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 cursor-pointer">
                <svg className="w-5 h-5 text-black/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                </svg>
            </div>

             <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 cursor-pointer">
                    <svg className="w-5 h-5 text-black/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                    </svg>
            </div>

             <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 cursor-pointer">
                <svg className="w-5 h-5 text-black/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>
                </svg>
            </div>

            </div>
        
            
        </div>
   {/* sort of categories (second navbar) */}

      
        
        </nav>
        
    )
}

export default Navbar;