import Navbar  from "../components/Navbar";
import Hero from "../components/Hero";
import TrendingCard from "../components/TrendingCard";
import ProductCard from "../components/ProductCard";
import Logo from "../components/icons/Logo";
import Footer from "../components/Footer";

const trendingBanners = [
  {
    category: "Fashion",
    text: "Fashion Finds at Must-Love Prices",
    image: "/public/cloths.png"
  },
  {
    category: "Electronics",
    text: "Next-Gen Tech. Next-Level Savings.",
    image: "/public/tech.png"
  },
  {
    category: "Sports",
    text: "Power Your Workout for Less",
    image: "/public/workout.png"
  }
];

const productInfo = [
    {
        image: "/public/iphone.jpg",
        title: "Iphone 17 Pro",
        price: "$999",
        oldPrice: "$1400"
    },
    {
        image: "/public/fishTank.png",
        title: "Fish Tank",
        price: "$100",
        oldPrice: "$250"
    },
    {
        image: "/public/sneakers.png",
        title: "Sneakers",
        price: "$50",
        oldPrice: "$75"
    },
    {
        image: "/public/clock.png",
        title: "Clock",
        price: "$25",
        oldPrice: "$50"
    },
]

const HomePage = () => {
    return (
    <main>
        <Navbar />
        <section className = "flex justify-center items-center ">
            <Hero />
        </section>

        <section className = "flex flex-col mt-20 items-center  h-screen gap-15">

        <div className = "flex flex-col gap-4">
            <h1 className = "font-semibold text-2xl">
                Trending
            </h1>
            <div className = "flex gap-10">
                {trendingBanners.map((banner) => (
                    <TrendingCard 
                title={banner.text}
                image= {banner.image}
                category={banner.category}
                />
                ))}
            </div>
        </div>
        

        <div className = "flex flex-col gap-15 ml-[-175px]">
            <h1 className = "font-semibold text-2xl">
                For you
            </h1>
            <div className = "flex gap-10">
                {productInfo.map((info) => (
                    <ProductCard 
                image = {info.image}
                title = {info.title} 
                price = {info.price}
                oldPrice = {info.oldPrice}
                
                />
                ))}
            </div>
                    
        </div>
        </section>
        
        <Footer />
    </main>
    );
}
export default HomePage;