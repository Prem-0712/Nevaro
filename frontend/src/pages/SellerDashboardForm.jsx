import React, { useEffect, useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { createSellerProfile } from "../services/sellerService.js";
import successLogo from "../assets/successLogo.png";
import ProfileCreationSuccessMsg from "../components/ProfileCreationSuccessMsg.jsx";
import { Country } from "country-state-city";
const countries = Country.getAllCountries();

// const GEONAMES_API = 'http://api.geonames.org/postalCodeLookupJSON?postalcode=711103&country=IN&username=nevaro'


const SellerDashboardForm = ({ onProfileCreated }) => {
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
    // const access_token = useSelector((store)=> store.auth.accessToken)
    // console.log(access_token)
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [currentState, setCurrentState] = useState(null);
    const [currentCity, setCurrentCity] = useState(null);
    const [profileCreated, setProfileCreated] = useState(false)
    const [errors, setErrors] = useState({});
    const [isFormSubmit, setIsFormSubmit] = useState(false);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(formData)
    }
    const handlePhoneChange = (value) => {
        setPhone(value);
        setFormData(prev => ({ ...prev, phone_number: `+ ${value}` }))
    }
    const validate = () => {
        const newErrors = {};
        if (!phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.business_email.trim()) newErrors.email = "Email is required";
        else if (!formData.address_line_1.trim()) newErrors.address_line_1 = "Enter a Address Line 1"
        if (!formData.address_line_2.trim()) newErrors.address_line_2 = "Enter Adress Line 2";
        else if (!formData.postal_code) newErrors.postal_code = "Enter postal code";
        else if (!formData.city.trim()) newErrors.city = "Enter a city name";
        else if (!formData.state_region.trim()) newErrors.state_region = "Enter a state region";
        else if (!formData.country.trim()) newErrors.country = "Enter a contry"
        return newErrors;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // debugger;
        // alert("HandleSubmit clicked");
        console.log("handle submit triggred");

        // form validation
        if (!isFormSubmit) {
            const validationErrors = validate();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
        }
        try {
            const { data } = await createSellerProfile(formData);
            console.log("handsubmit data:", data);
            setProfileCreated(true);
        } catch (error) {
            // Extract backend errors from response
            if (error.response?.data?.errors) {
                // Backend returns errors as an object with field names as keys
                const backendErrors = error.response.data.errors;

                // Convert the error arrays to strings
                const formatErrors = {};
                Object.keys(backendErrors).forEach(field => {
                    // take the first error message for each field
                    formatErrors[field] = backendErrors[field][0];
                });

                setErrors(formatErrors);
            }
            else {
                console.log("Something went wrong: ", error);
            }
        }
    }

    const handleBlur = async (postal_code) => {
        try {
            const data = await fetch(
                `http://api.geonames.org/postalCodeLookupJSON?postalcode=${postal_code}&country=IN&username=nevaro`
            );

            const json = await data.json();

            if (!json.postalcodes || json.postalcodes.length === 0) {
                setErrors(prev => ({
                    ...prev,
                    postal_code: "Invalid postal code"
                }));

                return;
            }

            const postalData = json.postalcodes[0];

            setFormData(prev => ({
                ...prev,
                city: postalData.adminName3,
                state_region: postalData.adminName1,
                country: postalData.countryCode
            }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (profileCreated) {
            const timer = setTimeout(() => {
                onProfileCreated();
            }, 1500);

            return () => clearTimeout(timer);
        }

    }, [profileCreated]);

    if (!profileCreated) {
        return (
            <>
                {/* <section className="bg-amber-300 p-4 flex justify-center items-center max-h-fit"> */}
                <section className="">
                    <div className="">
                        <h1 className="text-2xl font-bold mb-4 text-center">Create Seller Profile</h1>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div style={{}}>
                                <PhoneInput
                                    country={"in"}
                                    onChange={handlePhoneChange}
                                    value={phone}
                                />
                                {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}

                            </div>
                            <input className="p-4 border rounded-lg" name="business_name" type="text" placeholder="Business Name" onChange={handleChange} required={true} />
                            {errors.non_field_errors && <p className="text-red-500 text-xs mt-1">{errors.non_field_errors}</p>}

                            <input className="p-4 border rounded-lg" name="business_email" type="email" placeholder="Business Email" onChange={handleChange} required={true} />
                            {errors.business_email && <p className="text-red-500 text-xs mt-1">{errors.business_email}</p>}

                            <input className="p-4 border rounded-lg" name="address_line_1" type="text" placeholder="Adress line 1" onChange={handleChange} required={true} />
                            <input className="p-4 border rounded-lg" name="address_line_2" type="text" placeholder="Adress line 2" onChange={handleChange} required={true} />

                            <input className="p-4 border rounded-lg" name="postal_code" type="number" placeholder="Postal code" onChange={handleChange}
                                onBlur={(e) => handleBlur(e.target.value)} required={true}
                            />
                            {errors.postal_code && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.postal_code}
                                </p>
                            )}

                            <input className="p-4 border rounded-lg" name="city" type="text" placeholder="city"
                                onChange={handleChange}
                                value={formData.city} required={true}
                            />


                            <input className="p-4 border rounded-lg" name="state_region" type="text" placeholder="state region" onChange={handleChange}
                                value={formData.state_region} required={true}
                            />


                            {/* <input className="p-4 border rounded-lg" name="country" type="text" placeholder="country"
                                onChange={handleChange}
                                value={formData.country} required={true}
                            /> */}
                            <select className="p-4 border rounded-lg"
                                value={formData.country}
                                onChange={(e) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        country: e.target.value,
                                    }))}
                            >
                                <option value="">Select Country</option>

                                {countries.map((country) => (
                                    <option
                                        key={country.isoCode}
                                        value={country.isoCode}
                                    >
                                        {country.name}
                                    </option>
                                ))}
                            </select>

                            <button onSubmit={handleSubmit} className="border py-2 rounded-lg cursor-pointer hover:bg-black hover:text-white">Submit</button>

                        </form>
                    </div>
                </section>
            </>
        )
    } else {
        return (
            <>
                <ProfileCreationSuccessMsg />
            </>
        )
    }

}
export default SellerDashboardForm;