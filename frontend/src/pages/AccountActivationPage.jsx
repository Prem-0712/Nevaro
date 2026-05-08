import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import yellowBackground from "../assets/yellowBackground.png";

const AccountActivationPage = () => {
  const [status, setStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { uid, token } = useParams();

  // console.log(useParams, uid, token);

  useEffect(() => {
    if (!uid || !token) {
      setStatus("error");
      setErrorMsg("Invalid activation link. Please check your email.");
      return;
    }

    const activateAccount = async () => {
      try {
        const response = await fetch(
  `http://localhost:8000/api/account/activate/?uid=${uid}&token=${token}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
          }
        );

        const data = await response.json();

        if (data.success) {
          setStatus("success");
          setTimeout(() => navigate("/"), 6000);
        } else {
          setStatus("error");
          setErrorMsg(data.errors?.msg || "Activation failed. Please try again.");
        }
      } catch (err) {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#FAD93D] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={yellowBackground} alt="Background" className="h-full w-full object-cover" />
      </div>

      <div className="relative z-10 bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">

        {status === "loading" && (
          <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 border-4 border-yellow-300 border-t-yellow-500 rounded-full animate-spin" />
            <h2 className="text-xl font-bold text-gray-800">Activating your account...</h2>
            <p className="text-sm text-gray-500">Please wait while we verify your details.</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-9 h-9 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Account Activated! 🎉</h2>
            <p className="text-sm text-gray-500">Your account has been successfully activated. You can login now.</p>
            <p className="text-xs text-gray-400">Redirecting you to login in 5 seconds...</p>
            <a href="/" className="mt-2 w-full bg-[#FAD93D] hover:bg-yellow-400 text-gray-800 font-semibold py-2.5 rounded-lg text-sm transition-colors text-center block">
              Go to Login
            </a>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-9 h-9 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Activation Failed</h2>
            <p className="text-sm text-gray-500">{errorMsg}</p>
            <a href="/" className="mt-2 w-full bg-[#FAD93D] hover:bg-yellow-400 text-gray-800 font-semibold py-2.5 rounded-lg text-sm transition-colors text-center block">
              Go to Login
            </a>
          </div>
        )}

      </div>
    </main>
  );
};

export default AccountActivationPage;