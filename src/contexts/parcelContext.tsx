import React, { createContext, useEffect, useState } from 'react';
<<<<<<< HEAD
//import { createLogicalAnd } from 'typescript';
=======
>>>>>>> d4cda5941e9200d7da31977f0cd33e05c58e1382
import { getSentParcels, getReceivedParcels } from './parcelApiRequests';

interface ParcelContextType {
    sentParcels: any;
    receivedParcels: any;
    incomingParcels: any;
    deliveredParcels: any;
}

const ParcelContext = createContext<ParcelContextType | undefined>(undefined);

// when userContext is created, we can use this interface to pass in the userid as a prop
//interface ParcelContextProviderProps {
//    userid: number; // Add userid as a prop
//    children: React.ReactNode;
//}

const ParcelContextProvider = (props: any) => { //(props: ParcelContextProviderProps)
    //const { userid, children } = props;

    const [sentParcels, setSentParcels] = useState<any>([]);
    const [receivedParcels, setReceivedParcels] = useState<any>([]);

    useEffect(() => {
        const fetchSentParcels = async () => {
            const data = await getSentParcels(5); //(userid) Userid is hardcoded for now, will be passed in as a prop later
            setSentParcels(data);
        };
        fetchSentParcels();
    }, []); //[userid]

    useEffect(() => {
        const fetchReceivedParcels = async () => {
            const data = await getReceivedParcels(5);//(userid) Userid is hardcoded for now, will be passed in as a prop later
            setReceivedParcels(data);
        };
        fetchReceivedParcels();
    }, []); //[userid]

    const incomingParcels = receivedParcels.filter((parcel: any) => parcel.status !== "reciever_recieved_parcel");

    const deliveredParcels = receivedParcels.filter((parcel: any) => parcel.status === "reciever_recieved_parcel");

    // when userContext is ready, replace {props.children} with {children}
    return (
        <ParcelContext.Provider value={{sentParcels, receivedParcels, incomingParcels, deliveredParcels}}>
            {props.children}
        </ParcelContext.Provider>
    );
};

export const useParcelContext = () => {
    const context = React.useContext(ParcelContext);
    if (context === undefined) {
        throw new Error('useParcelContext must be used within a ParcelContextProvider');
    }
    return context;
}
    // when userContext is ready, this can be used in components to pass the userid to the ParcelContextProvider
    // return (
    //     <div>
    //     <ParcelContextProvider userid={userid}>
    //         {/* Your component content */}
    //     </ParcelContextProvider>
    //     </div>
    // );

export default ParcelContextProvider;