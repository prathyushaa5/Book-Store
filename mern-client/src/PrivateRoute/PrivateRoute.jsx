import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contects/AuthProvider';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

const PrivateRoute = ({ children }) => { // Correctly destructure props to get children
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="text-center">
                <Spinner aria-label="Center-aligned spinner example" />
            </div>
        );
    }

    if (user) {
        return children; // Render children if user is authenticated
    }

    return (
        <Navigate to="/login" state={{ from: location }} replace /> // Redirect to login if user is not authenticated
    );
}

export default PrivateRoute;
