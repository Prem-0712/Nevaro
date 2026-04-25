import { useState } from "react";
import Logo from "./icons/Logo.jsx";
import { loginUser } from "../services/authService.js";
import RegisterCard from "./RegisterCard.jsx";
import { useNavigate } from "react-router-dom";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

const LoginCard = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [LoginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("customer");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const validate = () => {
  const newErrors = {};

  if (!LoginFormData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(LoginFormData.email)) {
    newErrors.email = "Enter a valid email";
  }

  if (!LoginFormData.password) {
    newErrors.password = "Password is required";
  } else if (!passwordRegex.test(LoginFormData.password)) {
    newErrors.password = "Min 8 chars, include uppercase, lowercase, number and special character";
  }

  return newErrors;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({});


    const valErrors = validate();
    if (Object.keys(valErrors).length > 0) {
      setErrors(valErrors);
      return;
    } 
    setLoading(true)
    try {
  const response = await loginUser(LoginFormData);

  if (response.success === false) {
    setErrors(response.errors || {});
  } else {
    setLoginFormData({ email: "", password: "" });
    navigate("/home-page"); 
  }
} catch (err) {
  setErrors({ general: "Something went wrong. Please try again." });
} finally {
  setLoading(false); 
}
  };

  return (
    <main className="flex flex-col z-10 items-center mb-10 lg:mb-0">
    

      {/* Main Card */}
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-screen max-w-lg mb-20">
        
        {success && (
          <div className="bg-green-50 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">
            {success}
          </div>
        )}
        {errors.non_field_errors && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4 flex justify-center">
            {errors.non_field_errors}
          </div>
        )}
        <div className="flex flex-col gap-4 mb-4">
          {/* Continue with google */}
        <div className="flex w-full h-12 px-4 bg-gray-50 rounded-lg border justify-center items-center gap-2 cursor-pointer">
          <img src="./google-icon.svg" alt="Google Logo" className="w-6 h-6" />
          <h1 className = "font-semibold text-lg">Continue with Google</h1>
        </div>
        {/* Separator */}
        <div className="relative flex items-center ">
          <div className="grow border-t border-gray-400"></div>
          <span className="shrink mx-4 text-gray-500">or</span>
        <div className="grow border-t border-gray-400"></div>
</div>
        
        </div>
        

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name - only on register */}
          

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={LoginFormData.email}
              onChange={(e) => setLoginFormData({ ...LoginFormData, email: e.target.value })}
              className={`w-full h-12 px-4 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.email ? "border-red-400" : "border-black"}`}
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={LoginFormData.password}
              onChange={(e) => setLoginFormData({ ...LoginFormData, password: e.target.value })}
              className={`w-full h-12 px-4 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.password ? "border-red-400" : "border-black"}`}
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password - only on register */}
        

          {/* User Role - only on register */}
          

          {/* Remember me / Forgot password */}
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-500"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                Remember me
              </label>
            </div>
            {isLogin && (
              <a className="text-blue-600 hover:underline cursor-pointer">
                Forgot my Password
              </a>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FAD93D] hover:bg-yellow-400 text-gray-800 font-semibold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Please wait..." : isLogin ? "Log In" : "Sign In"}
          </button>

          
        </form>
      </div>
    </main>
  );
};

export default LoginCard;