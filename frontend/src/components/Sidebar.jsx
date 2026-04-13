import GraphIcon from "../components/icons/graphIcon";
import BoxIcon from "../components/icons/BoxIcon";
import CreditCardIcon from "../components/icons/CreditCardIcon";
import HeartIcon from "../components/icons/HeartIcon";
import OutIcon from "../components/icons/OutIcon";
import SettingsIcon from "../components/icons/SettingsIcon";
import UserIcon from "../components/icons/UserIcon";

const Sidebar = () => {
    const sideBarOptions = [
    {
        name: "DashBoard", icon: <GraphIcon />
    },
    {
        name: "My Order", icon: <BoxIcon />
    },
    {
        name: "Wishlist", icon: <HeartIcon />
    },
    {
        name: "My Profile", icon: <UserIcon />
    },
    {
        name: "Payment ", icon: <CreditCardIcon />
    },
    {
        name: "Settings", icon: <SettingsIcon />
    },
    {
        name: "Logout", icon: <OutIcon />
    },
]
    return (
        <div className = "h-screen pt-10 pl-6 p-5 w-72">
                {/* buttons Container */}
                <div className = "flex flex-col gap-5">

                {/* buttons */}
                {sideBarOptions.map((options) => (
                    <div key={options.name} className="flex items-center gap-10 bg-[#EEEDED] py-2 px-1 rounded-md cursor-pointer">
                        {options.icon}
                        <h1 className="text-md font-medium">
                            {options.name}
                        </h1>
                    </div>
                ))}

                
                
                </div>
                
            </div>
    )
};
export default Sidebar;