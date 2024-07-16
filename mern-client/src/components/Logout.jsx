import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { getAuth, signOut } from "firebase/auth";

const Logout = () => {
    const { logOut } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleLogout = () => {
        setShowConfirmation(true); // Show confirmation dialog
    };

    const confirmLogout = () => {
        logOut().then(() => {
            alert("Sign out successful");
            navigate(from, { replace: true });
        }).catch((error) => {
            console.error('Logout error:', error);
        });
    };

    const cancelLogout = () => {
        setShowConfirmation(false); // Hide confirmation dialog
        navigate('/admin/dashboard'); // Navigate to dashboard route on cancel
    };

    return (
        <div className="h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl mb-4">Logout</h2>
                <p className="mb-4">Are you sure you want to logout?</p>
                <div className="flex justify-center gap-4">
                    <button className="bg-red-800 px-4 py-2 text-white hover:bg-red-700 focus:outline-none"
                        onClick={handleLogout}>Logout</button>
                    <button className="bg-gray-600 px-4 py-2 text-white hover:bg-gray-500 focus:outline-none"
                        onClick={cancelLogout}>Cancel</button>
                </div>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl mb-4">Confirm Logout</h2>
                        <p className="mb-4">This will log you out of your account.</p>
                        <div className="flex justify-center gap-4">
                            <button className="bg-red-800 px-4 py-2 text-white hover:bg-red-700 focus:outline-none"
                                onClick={confirmLogout}>Confirm Logout</button>
                            <button className="bg-gray-600 px-4 py-2 text-white hover:bg-gray-500 focus:outline-none"
                                onClick={cancelLogout}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logout;
