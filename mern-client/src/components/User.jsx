import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contects/AuthProvider';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Example: using a user icon from react-icons

const User = () => {
    const { user } = useContext(AuthContext); // Assuming user details are available in AuthContext
    const [userDetails, setUserDetails] = useState(null);

    // Fetch user details on component mount
    useEffect(() => {
        if (user) {
            setUserDetails({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            });
        }
    }, [user]);

    return (
        <div className="h-screen bg-gray-1000 text-white flex items-center mx-auto justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl mb-4">User Profile</h2>
                {userDetails && (
                    <div className="mb-4">
                        {userDetails.photoURL ? (
                            <img src={userDetails.photoURL} alt="User Avatar" className="rounded-full w-20 h-20 mx-auto mb-2" />
                        ) : (
                            <div className="bg-gray-600 rounded-full w-20 h-20 mx-auto mb-2 flex items-center justify-center text-4xl">
                                <FaUserCircle className="text-white" />
                            </div>
                        )}
                        <p className="text-lg">{userDetails.email}</p>
                    </div>
                )}
                <Link to="/admin/dashboard" className="bg-gray-600 px-4 py-2 text-white hover:bg-gray-500 focus:outline-none mt-4 block">Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default User;
