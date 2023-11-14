import React, { createContext } from "react";

interface DataContextType {
    getSentParcels: (userid: number) => Promise<any>;
    getReceivedParcels: (userid: number) => Promise<any>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

const dataHandling = {

    getSentParcels: async (userid: number) => {
        const response = await fetch('http://localhost:3001/sent?user_id=' + userid);
        const data = await response.json();
        return data;
    },
    getReceivedParcels: async (userid: number) => {
        const response = await fetch('http://localhost:3001/received?user_id=' + userid);
        const data = await response.json();
        return data;
    },
}

const DataContextProvider = (props: any) => {
    const data = dataHandling;
    return (
        <DataContext.Provider value={data}>
            {props.children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = React.useContext(DataContext);
    if (context === undefined) {
        throw new Error('useDataContext must be used within a DataContextProvider');
    }
    return context;
};


export default DataContextProvider;


