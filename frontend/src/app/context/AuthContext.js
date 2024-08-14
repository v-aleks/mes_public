import React from 'react';
import {
    onAuthStateChanged,
    getAuth,
    signOut
} from 'firebase/auth';
import firebase_app from '../firebase/config';

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
