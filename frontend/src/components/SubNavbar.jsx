import { useState } from "react";



const SubNavbar = () => {
const [activeCategory, setActiveCategory] = useState (null);
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
    return (
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
    )
};
export default SubNavbar;