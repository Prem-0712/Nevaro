import { useState } from "react";
import Logo from "./icons/Logo.jsx";
import { registerUser, loginUser } from "../services/authService";
import { useDispatch } from "react-redux";
import { setToken } from "../store/authSlice";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

const LoginCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("customer");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(password))
      newErrors.password = "Min 8 chars, include uppercase, lowercase, number and special character";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({});

    if (!isLogin) {
      // REGISTER FLOW
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setLoading(true);
      try {
        const response = await registerUser({
          name,
          email,
          password,
          password2: confirmPassword,
          user_role: userRole,
        });
        if (response.success === false) {
          setErrors(response.errors || {});
        } else {
          setSuccess("Registration successful! Please check your email to activate your account.");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setUserRole("customer");
        }
      } catch (err) {
        setErrors({ general: "Something went wrong. Please try again." });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        const { data, status } = await loginUser({ email, password });
        // console.log("Login response:", data, "Status:", status);


        if (status === 200) {
          const userRole = data.data.user_role;

          dispatch(setCredentials({
            accessToken: data.data.jwt_token.access,
            refreshToken: data.data.jwt_token.refresh,
            userRole: userRole,
          }));

          // Redirect based on role
          if (userRole === "customer") {
            window.location.href = "/user-dashboard";
          } else if (userRole === "seller") {
            window.location.href = "/seller-dashboard";
          } else if (userRole === "admin") {
            window.location.href = "/admin-dashboard";
          }
        }

        else {
          setErrors({
            general:
              data.errors?.non_field_errors?.[0] ||
              "Login failed. Please try again.",
          });
        }
      } catch (err) {
        setErrors({ general: "Something went wrong. Please try again." });
      } finally {
        setLoading(false);
      }
    }

  };

  return (
    <main className="flex flex-col z-10 items-center mb-10 lg:mb-0">
      {/* Logo */}
      <div className="text-center mb-6">
        <Logo />
      </div>

      {/* Toggle Switch */}
      <div className="flex justify-center mb-10">
        <div className="bg-gray-100 rounded-full flex shadow-lg shadow-black/30">
          <button
            onClick={() => {
              setIsLogin(false);
              setErrors({});
              setSuccess("");
            }}
            className={`${
              !isLogin ? "bg-black text-white" : "text-black"
            } px-6 py-2 rounded-full text-sm font-medium transition-all`}
          >
            Sign in
          </button>
          <button
            onClick={() => {
              setIsLogin(true);
              setErrors({});
              setSuccess("");
            }}
            className={`${
              isLogin ? "bg-black text-white" : "text-black"
            } px-6 py-2 rounded-full text-sm font-medium transition-all`}
          >
            Log in
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl min-w-125">
        {success && (
          <div className="bg-green-50 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">
            {success}
          </div>
        )}
        {errors.general && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name - only on register */}
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full h-12 px-4 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.name ? "border-red-400" : "border-black"
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          )}

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-12 px-4 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.email ? "border-red-400" : "border-black"
              }`}
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-12 px-4 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.password ? "border-red-400" : "border-black"
              }`}
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password - only on register */}
          {!isLogin && (
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full h-12 px-4 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.confirmPassword ? "border-red-400" : "border-black"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* User Role - only on register */}
          {!isLogin && (
            <div>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
          )}

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
            className="w-full h-12 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:opacity-60"
          >
            {loading ? "Please wait..." : isLogin ? "Log In" : "Sign In"}
          </button>

          {!isLogin && (
            <div className="flex flex-col items-center gap-4">
              <p className="font-bold">or</p>
              <button className="w-full h-12 px-4 bg-gray-50 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-yellow-400">
                Sign in with Google
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default LoginCard;