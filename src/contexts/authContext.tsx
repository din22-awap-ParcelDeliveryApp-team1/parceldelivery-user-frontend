import React, {createContext, useState, useContext} from 'react';

// determine what values/states the context should include
// these need to be passed in as props to the context provider
interface AuthContextType {
    token: string | undefined;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    userId: number | undefined;
    setUserId: React.Dispatch<React.SetStateAction<number>>;
}
// create the actual context here; the AuthContextType is the type of the context
// AuthContextType need to be used as type when using the contect in other components
const AuthContext = createContext<AuthContextType | null>(null);

// This AuthContextProvider is the component that will wrap the components which need access to the context
// the AuthContextProvider needs to be exported from here and imported in index.tsx and wrapped around <APP />
const AuthContextProvider = (props: any) => {

    // these are the actual states of this context
    // these states can be used in the components if you want to use the context
    // for example in Signin.tsx you can now use 'setToken' and 'setUserId' to set the token and userId
    const [token, setToken] = useState<string>("");
    const [userId, setUserId] = useState<number>(0);

    // the value of the context (meaning the states that are used in other components) is determined here
    // the value is passed in as a prop to the AuthContext.Provider
    // these valueas can be given to AuthContext.Provider also directly to provider as in parcelContext.tsx
    const value = {
        token,
        setToken,
        userId,
        setUserId
    };

    // here you return the AuthContext.Provider
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
    };

// here you export function called 'useAuthContext'; function is returning AuthContext to be used in other components
// this function needs to be imported and called in other components to use the context
// this is not necessary, but makes the code cleaner and contexts easier to use
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthContextProvider');
    }
    return context;
};

// here you export the AuthContextProvider for index.tsx to use
export default AuthContextProvider;






