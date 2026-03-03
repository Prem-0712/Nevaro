import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar";
import DashStats from "../components/DashStats";





const UserDashboard = () => {
    return (
        <main>
        <Navbar />
        {/*  Page Container */}
        <div className = "flex ">
            {/* Sidebar component */}
            <Sidebar />
            {/* page Container */}
            <div className = "pt-10 flex flex-col pl-3 flex-1">

                <div className = "flex flex-col gap-3">

                     <h1 className = "font-medium text-2xl">
                            DashBoard Overview
                    </h1> 

                    <p className = "text-[#5B5757] text-sm">
                        Welcome back, John!  Here’s what’s with your store today.
                    </p> 
                </div>
                <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  mt-8 w-full ">
                    <DashStats />
                </div>



               
               
                

            </div>

        </div>
    </main>
    )
    
};
export default UserDashboard;