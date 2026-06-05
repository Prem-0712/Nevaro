import React, { useEffect, useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

// const GEONAMES_API = 'http://api.geonames.org/postalCodeLookupJSON?postalcode=711103&country=IN&username=nevaro'


const SellerDashboardForm = () => {
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
    });
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState(null);
    const [currentState, setCurrentState] = useState(null);
    const [currentCity, setCurrentCity] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(formData)
    }
    const handlePhoneChange = (value) => {
        setPhone(value);
        setFormData(prev => ({ ...prev, phone_number: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
    }

    const handleBlur = async(postal_code) =>{
        const data = await fetch(`http://api.geonames.org/postalCodeLookupJSON?postalcode=${postal_code}&country=IN&username=nevaro`)
        let json = await data.json()
        json = json.postalcodes[0]
        setFormData((prev)=>({...prev, city: json.adminName3, state_region: json.adminName1, country: json.countryCode}))
        console.log(json)
    }
    return (
        <>
            <section className="bg-amber-300 p-4 flex justify-center items-center max-h-fit">
                <div className="bg-white p-4 w-md rounded-lg">
                    <h1 className="text-2xl font-bold mb-4 text-center">Seller Dashboard Form</h1>
                    <form className="flex flex-col gap-4">
                        <div style={{}}>
                            <PhoneInput
                                country={"in"}
                                onChange={handlePhoneChange}
                                value={phone}
                            />
                        </div>
                        <input className="p-4 border rounded-lg" name="business_name" type="text" placeholder="Business Name" onChange={handleChange} />
                        <input className="p-4 border rounded-lg" name="business_email" type="email" placeholder="Business Email" onChange={handleChange} />
                        <input className="p-4 border rounded-lg" name="address_line_1" type="text" placeholder="Adress line 1" onChange={handleChange} />
                        <input className="p-4 border rounded-lg" name="address_line_2" type="text" placeholder="Adress line 2" onChange={handleChange} />

                        <input className="p-4 border rounded-lg" name="postal_code" type="number" placeholder="Postal code" onChange={handleChange}
                        onBlur={(e)=>handleBlur(e.target.value)}
                         />

                        <input className="p-4 border rounded-lg" name="city" type="text" placeholder="city"
                        onChange={handleChange}
                        value={formData.city}
                         />


                        <input className="p-4 border rounded-lg" name="state_region" type="text" placeholder="state region" onChange={handleChange}
                        value={formData.state_region}
                         />


                        <input className="p-4 border rounded-lg" name="country" type="text" placeholder="country" 
                        onChange={handleChange}
                        value={formData.country}
                         />

                        <button onSubmit={handleSubmit} className="border py-2 rounded-lg cursor-pointer hover:bg-black hover:text-white">Submit</button>

                    </form>
                </div>
            </section>
        </>
    )
}
export default SellerDashboardForm;