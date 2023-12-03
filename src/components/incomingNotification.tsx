import React from "react";
import { useAuthContext } from "../contexts/authContext";
import { useParcelContext } from "../contexts/parcelContext";
import { Link } from "react-router-dom";

const IncomingNotification = () => {
    const { token } = useAuthContext() as any;
    const { incomingParcels } = useParcelContext() as any;

    const numberOfParcels = () => {
        switch (incomingParcels.length) {
            case 0:
                return ""
            case 1:
                return "You have 1 incoming parcel!"
            default:
                return `You have ${incomingParcels.length} incoming parcels!`
        };
    };
    return (
        <div>
            {token && (incomingParcels.length > 0) ? (
                <div>
                    <Link className="navBarLink" to="/home">{numberOfParcels()}</Link>
                </div>
            ) : null}         
        </div>
    );
};

export default IncomingNotification;
