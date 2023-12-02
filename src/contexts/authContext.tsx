import React, {createContext, useState,  useContext} from 'react';
interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}
const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext);
export const AuthProvder:React.FC =(props: any) => {
    const [token, setToken] = useState<string | null>(null);
    return (
        <AuthContext.Provider value={{token, setToken}}>
            {props}
        </AuthContext.Provider>
    );
};