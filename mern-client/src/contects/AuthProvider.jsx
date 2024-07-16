import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
import app from '../firebase /firebase.config';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged ,signInWithPopup,signInWithEmailAndPassword} from "firebase/auth";
export const AuthContext=createContext();
import { GoogleAuthProvider } from 'firebase/auth';
import {signOut } from "firebase/auth";
const auth=getAuth(app);

const googleProvider=new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Initialize loading state correctly

    const createUser = (email, password) => {
        setLoading(true); // Set loading to true when starting user creation

        return createUserWithEmailAndPassword(auth, email, password)
            
    }

    const loginwithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            
    }
    const logOut=()=>{
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () =>{ unsubscribe();}
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        loginwithGoogle,
        login,
        logOut // Include login function in authInfo
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;