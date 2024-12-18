import React, { createContext, useState, useEffect } from 'react';
import { adminVerify, grabUser, logOut as apiLogOut } from './utilities/user-api';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await grabUser();
                setUser(fetchedUser);
            } catch (err) {
                setUser(null);
            }
        };

        fetchUser();
    }, []);


    useEffect(() => {
        const fetchAdminStatus = async () => {
            if (user) {
                try {
                    const isAdmin = await adminVerify();
                    setAdmin(isAdmin);
                } catch (err) {
                    setAdmin(false);
                }
            }else{
                setAdmin(false);
            }
        };
        fetchAdminStatus();
    }, [user]); 

    useEffect(() => {
        if (user !== null && admin !== null) {
            setLoading(false);
        }
    }, [user, admin]);


    const logOut = async () => {
        try {
            await apiLogOut();
        } catch (err) {
            console.error('Error logging out:', err);
        } finally {
            setUser(null);
            setAdmin(null);
            window.location.reload();
        }
    };

    useEffect(() => {
        if (user !== null && admin !== null) {
          setLoading(false);
        }else if (user === null && admin === null) {
            setLoading(false);
        }
      }, [user, admin]);

    return (
        <UserContext.Provider value={{ user, admin, setUser, logOut, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };