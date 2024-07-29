import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contects/AuthProvider';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

const PrivateRoute = ({ children }) => {
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
        return children; // Render the children components if user is authenticated
    }

    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
