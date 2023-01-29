import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { AUTH } from "../firebase.config";



export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(AUTH, (user) => {
            setCurrentUser(user);
        });

        return () => {
            unsub();
        };

    }, []);

    return (
        <AuthContext.Provider value={{
            currentUser
         }}>
            { children }
        </AuthContext.Provider>
    )
};