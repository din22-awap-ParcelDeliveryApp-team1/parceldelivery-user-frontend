import React, { createContext, useEffect, useState } from 'react';
import { getSentParcels, getReceivedParcels } from './parcelApiRequests';
import { useAuthContext } from './authContext';

interface ParcelContextType {
    sentParcels: any;
    receivedParcels: any;
    incomingParcels: any;
    deliveredParcels: any;
};

const ParcelContext = createContext<ParcelContextType | undefined>(undefined);

const ParcelContextProvider = (props: any) => {
    const { userid, token } = useAuthContext() as any; //change from userId to userid
    const [sentParcels, setSentParcels] = useState<any>([]);
    const [receivedParcels, setReceivedParcels] = useState<any>([]);

    useEffect(() => {
        const fetchSentParcels = async () => {
            const data = await getSentParcels(userid, token); //change from userId to userid
            setSentParcels(data);
        };
        if (token) {
            fetchSentParcels();
        } else {
            setSentParcels([]);
        };
        
    }, [userid, token]); //change from userId to userid

    useEffect(() => {
        const fetchReceivedParcels = async () => {
            const data = await getReceivedParcels(userid, token); //change from userId to userid
            setReceivedParcels(data);
        };
        if (token) {
            fetchReceivedParcels();
        } else {
            setReceivedParcels([]);
        };
    }, [userid, token]); //change from userId to userid
    
    let incomingParcels: any = [];
    let deliveredParcels: any = [];

    if (receivedParcels.length > 0 && token) {
        incomingParcels = receivedParcels.filter((parcel: any) => parcel.status !== "reciever_recieved_parcel");
        deliveredParcels = receivedParcels.filter((parcel: any) => parcel.status === "reciever_recieved_parcel");
    };

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
};

export default ParcelContextProvider;