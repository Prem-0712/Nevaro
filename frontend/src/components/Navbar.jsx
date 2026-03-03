import Logo from "./icons/Logo.jsx"
import { useState } from "react";

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Categories', path: '/categories' },
  { name: 'Deals', path: '/deals' },
  { name: 'About', path: '/about' },
];

const CategoryData = {
  saved: {
    label: "Saved",
    title: "Your Saved Items",
    image: "/assets/saved-banner.png",
    sections: [
      {
        name: "Recent Favorites",
        itens: [
          { label: "Wishlist", slug: "wishlist" },
          { label: "Watch List", slug: "watchlist" }
        ]
      }
    ]
  },
  eletronics: {
    label: "Electronics",
    title: "Electronics & Technology",
    image: "/assets/eletronics-banner.png",
    sections: [
      {
        name: "Mobile and Accessories",
        itens: [
          { label: "SmartPhones", slug: "smartphones" },
          { label: "Feature phones", slug: "featurephones" },
          { label: "Phone cases", slug: "phonecases" },
          { label: "Screen protectors", slug: "screenprotectors" },
          { label: "Chargers & cables", slug: "chargerscables" },
          { label: "Power banks", slug: "powerbanks" },
          { label: "Earphones & headphones", slug: "earphonesheadphones" }
        ]
      }
    ]
  },
  fashion: {
    label: "Fashion",
    title: "Fashion & Style",
    image: "/assets/fashion-banner.png",
    sections: [
      {
        name: "Clothing & Shoes",
        itens: [
          { label: "Men's Fashion", slug: "mens-fashion" },
          { label: "Women's Fashion", slug: "womens-fashion" },
          { label: "Shoes", slug: "shoes" }
        ]
      }
    ]
  },
  collectibles: {
    label: "Collectibles and art",
    title: "Collectibles & Art",
    image: "/assets/collectibles-banner.png",
    sections: [
      {
        name: "Popular Categories",
        itens: [
          { label: "NFTs", slug: "nfts" },
          { label: "Stamps", slug: "stamps" },
          { label: "Antiques", slug: "antiques" }
        ]
      }
    ]
  },
  sports: {
    label: "Sports",
    title: "Sports & Outdoors",
    image: "/assets/sports-banner.png",
    sections: [
      {
        name: "Equipment",
        itens: [
          { label: "Cycling", slug: "cycling" },
          { label: "Fitness", slug: "fitness" },
          { label: "Camping", slug: "camping" }
        ]
      }
    ]
  },
  health: {
    label: "Health and beauty",
    title: "Health & Beauty",
    image: "/assets/health-banner.png",
    sections: [
      {
        name: "Personal Care",
        itens: [
          { label: "Skincare", slug: "skincare" },
          { label: "Makeup", slug: "makeup" },
          { label: "Fragrances", slug: "fragrances" }
        ]
      }
    ]
  },
  industrialEquipment: {
    label: "Industrial equipment",
    title: "Industrial & Business",
    image: "/assets/industrial-banner.png",
    sections: [
      {
        name: "Tools & Machinery",
        itens: [
          { label: "Heavy Equipment", slug: "heavy-equipment" },
          { label: "Lab Supplies", slug: "lab-supplies" }
        ]
      }
    ]
  },
  garden: {
    label: "Home and garden",
    title: "Home & Garden",
    image: "/assets/garden-banner.png",
    sections: [
      {
        name: "Garden Supplies",
        itens: [
          { label: "Plants", slug: "plants" },
          { label: "Outdoor Decor", slug: "outdoor-decor" }
        ]
      }
    ]
  },
  deals: {
    label: "Deals",
    title: "Today's Top Deals",
    image: "/assets/deals-banner.png",
    sections: [
      {
        name: "Flash Sales",
        itens: [
          { label: "Under $20", slug: "under-20" },
          { label: "Clearance", slug: "clearance" }
        ]
      }
    ]
  },
  sell: {
    label: "Sell",
    title: "Start Selling",
    image: "/assets/sell-banner.png",
    sections: [
      {
        name: "Selling Tools",
        itens: [
          { label: "Seller Center", slug: "seller-center" },
          { label: "Ad Portal", slug: "ad-portal" }
        ]
      }
    ]
  }
};


const Navbar = () => {
    const [activeCategory, setActiveCategory] = useState (null);
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

            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400">
                <svg className="w-5 h-5 text-black/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                </svg>
            </div>

             <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400">
                    <svg className="w-5 h-5 text-black/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                    </svg>
            </div>

             <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400">
                <svg className="w-5 h-5 text-black/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>
                </svg>
            </div>

            </div>
        
            
        </div>

                    {/* sort of categories (second navbar) */}

        <div className="sticky top-0 z-40 w-full bg-white/80 border border-gray-300 h-[50px] flex justify-center items-center ">
            {Object.entries(CategoryData).map(([key,value]) => (
                <div
                key = {key}
                onMouseLeave={() => setActiveCategory(null)}
                className = "relative overflow-visible"
                >
                    <div
                    onMouseEnter={() => setActiveCategory(key)}
                    className="cursor-pointer px-4 py-2 hover:border-b-2 hover:border-yellow-400"
                    >
                        <span className = "text-sm text-gray-600">
                            {value.label}
                        </span>
                    </div>
{activeCategory === key && (
    <div className="absolute top-full left-0 w-150 bg-white shadow-2xl rounded-xl border border-gray-700/80    p-6 flex gap-8 z-60 overflow-visible ">
      
  
  
  <div className="w-1/3 flex flex-col gap-4">
    <h3 className="font-bold text-xl text-gray-800 leading-tight">
      {value.title} 
    </h3>
    <img 
      src={value.image} 
      alt={value.title} 
      className="w-full h-40 object-cover rounded-lg bg-gray-100" 
    />
  </div>

  
  <div className="flex-1 grid grid-cols-2 gap-6">
    {value.sections.map((section, idx) => (
      <div key={idx} className="flex flex-col gap-2">
        
        <h4 className="font-bold text-sm text-gray-900 border-b pb-1">
          {section.name}
        </h4>
        
        
        <ul className="flex flex-col gap-1">
          {section.itens.map((link, linkIdx) => (
            <li key={linkIdx}>
              <a 
                href={`/${key}/${link.slug}`} 
                className="text-sm text-gray-500 hover:text-yellow-500 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</div>
                    )}


                </div>

            ))}

            
        
            
        </div>
        </nav>
        
    )
}

export default Navbar;