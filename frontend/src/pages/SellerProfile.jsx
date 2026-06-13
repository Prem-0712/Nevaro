import { useEffect, useState } from "react"
// import SellerDashboardForm from "./SellerDashboardForm"
import { getSellerProfile } from "../services/sellerService.js"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import SellerDashboard from "./sellerdashboard.jsx"
import SellerDashboardForm from "./SellerDashboardForm.jsx"
import profileLogo from '../assets/profile.png';

export const SellerProfile = () => {
    const [formData, setFormData] = useState({
        phone_number: "",
        business_name: "",
        business_email: "",
        address_line_1: "",
        address_line_2: "",
        postal_code: "",
        city: "",
        state_region: "",
        country: "",
    })
    const [profileExist, setProfileExist] = useState(null);
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        fetchSellerProfileData();
    }, []);

    const fetchSellerProfileData = async () => {
        try {
            const { data } = await getSellerProfile();
            console.log("Response:", data);
            setFormData(data.data);
            // console.log("hello status", status)
            setProfileExist(true)
        } catch (error) {
            console.log("Error", error.response);
            if (error.response?.status === 404) {
                setProfileExist(false);
            }
        }
    }

    if (profileExist === null) {
        return <h1>Loading...</h1>
    } else if (profileExist === false) {
        if (!showForm) {
            return (
                <>
                    <section className="flex justify-center items-center h-full">
                        <div className="w-sm">
                            <h2 className="text-2xl font-bold mb-2"><span><img src={profileLogo} alt="profile icon" className="h-10" /></span>My Profile</h2>
                            <p className="mb-6">You haven't created your seller profile yet. Create it now to start selling on the platform.</p>
                            <button className="w-sm border py-2 rounded-full hover:bg-black hover:text-white cursor-pointer"
                                onClick={() => setShowForm(true)}
                            >Create Profile</button>
                        </div>
                    </section>
                </>
            )
        }
        return (
            <>
                {showForm && (
                    <>
                        <SellerDashboardForm onProfileCreated={fetchSellerProfileData} />
                    </>
                )}

            </>
        )
    } else if (profileExist === true)
        return (
            <>
                <h1 className="text-2xl font-bold flex gap-3 items-center"><span><img src={profileLogo} alt="Profile Icon" className="h-10 " /></span>Seller Profile</h1>
                <form className="flex flex-col gap-4">
                    <div style={{}}>
                        <PhoneInput
                            country={"in"}
                            value={formData.phone_number}
                        />
                    </div>
                    <input className="p-4 border rounded-lg" name="business_name" type="text" placeholder="Business Name"
                        value={formData.business_name} readOnly
                    />
                    <input className="p-4 border rounded-lg" name="business_email" type="email" placeholder="Business Email" required={true}
                        value={formData.business_email} readOnly />

                    <input className="p-4 border rounded-lg" name="address_line_1" type="text" placeholder="Adress line 1" required={true}
                        value={formData.address_line_1} readOnly
                    />

                    <input className="p-4 border rounded-lg" name="address_line_2" type="text" placeholder="Adress line 2" required={true}
                        value={formData.address_line_2} readOnly
                    />


                    <input className="p-4 border rounded-lg" name="postal_code" type="number" placeholder="Postal code"
                        required={true}
                        value={formData.postal_code} readOnly
                    />

                    <input className="p-4 border rounded-lg" name="city" type="text" placeholder="city"

                        value={formData.city} required={true} readOnly
                    />


                    <input className="p-4 border rounded-lg" name="state_region" type="text" placeholder="state region"
                        value={formData.state_region} required={true} readOnly
                    />


                    <input className="p-4 border rounded-lg" name="country" type="text" placeholder="country"
                        value={formData.country} required={true} readOnly
                    />

                    {/* <button onSubmit={handleSubmit} className="border py-2 rounded-lg cursor-pointer hover:bg-black hover:text-white">Submit</button> */}
                </form>


            </>
        )
}