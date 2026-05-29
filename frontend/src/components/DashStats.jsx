import BoxIcon from "./icons/BoxIcon";
import ShippingIcon from "./icons/ShippingIcon";
import HeartIcon from "./icons/HeartIcon";
import DollarSignIcon from "./icons/DollarSignIcon";
import CountUp from './CountUp'






const DashStats  = () => {

const Stats = [
    {
        icon: <BoxIcon />, title: "Total Orders", value: "24"
    },
    {
        icon: <ShippingIcon />, title: "In Transit", value: "15"
    },
    {
        icon: <HeartIcon />, title: "Wishlist items ", value: "86"
    },
    {
        icon: <DollarSignIcon />, title: "Total Spent", value: "2847", isMoney: true
    }
]



    return (
        <>
            {Stats.map((info, index) => (
                <div
                key={index}
                className = "w-65 h-35 rounded-2xl border border-gray-300 p-6">
                    <div className = "flex flex-col gap-5">
                    <div className = "flex gap-3 items-center">
                            <div className = "rounded-md py-1 px-2 bg-[#EAEAEA] items-center">
                            {info.icon}
                            </div>
                            <h1 className = "font-semibold text-[#595656] text-[20px]">
                                {info.title}
                            </h1>

                            
                    </div>
                    <h1 className = "text-[#595656] font-medium text-[31px]">
                        {info.isMoney && <span className="mr-1">$</span>}
                        <CountUp
  from={0}
  to={info.value}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
  startCounting={false}
/>
                    </h1>
                    </div>
                

        </div>
            ))}
        </>
    )
};
export default DashStats;