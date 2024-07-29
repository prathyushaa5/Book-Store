import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider'; // Fixed import path
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    const { login, loginwithGoogle } = useContext(AuthContext);
    const [error, setError] = useState(null); // Initial state should be null
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                alert("Login successful");
                navigate(from, { replace: true });
            })
            .catch(() => {
                // Set error state to display error message
                setError("Incorrect email or password. Please try again.");
            });
    }

    const handleRegister = () => {
        loginwithGoogle().then((result) => {
            const user = result.user;
            alert("Sign up successfully");
            navigate(from, { replace: true });
        }).catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage); // Set error state to display error message
            alert(errorMessage); // Optionally display the error message in an alert
        });
    }

    return (
        <div className="min-h-screen bg-black py-6 text-white flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white text-black margin:auto shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Login form</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleLogin} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Email address" />
                                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                </div>
                                <div className="relative">
                                    <input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Password" />
                                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                </div>
                                {error && (
                                    <p className="text-red-600 mt-2 mb-4 text-sm">{error}</p> // Adjusted margin for consistency
                                )}
                                <p className="text-base">If you have no account, please <Link to="/sign-up" className="text-base text-blue-600">Sign Up</Link></p>
                                <div className="relative mt-4"> {/* Added margin-top for spacing */}
                                    <button className="bg-blue-500 text-white rounded-md px-2 py-1 w-full">Login</button> {/* Set width to full for consistent button size */}
                                </div>
                            </form>
                            <hr />
                            <button className="text-sm mt-8 flex gap-2" onClick={handleRegister}>Login with Google <FaGoogle /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
