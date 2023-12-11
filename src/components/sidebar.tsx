import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';


const Sidebar = () => {

    return (
        <ListGroup as="ol" variant="flush" className="sidebarListgroup">
            <ListGroup.Item id="sidebarListItem">
                <Link to="/SendNewParcel" id="sidebarList"><strong>Send a New Parcel</strong></Link>
            </ListGroup.Item>
            <ListGroup.Item id="sidebarListItem">
                <Link to="/sentParcels" id="sidebarList"><strong>Sent Parcels</strong></Link>
            </ListGroup.Item>
            <ListGroup.Item id="sidebarListItem">
                <Link to="/receivedParcels" id="sidebarList"><strong>Received Parcels</strong></Link>
            </ListGroup.Item>
            <ListGroup.Item id="sidebarListItem">
                <Link to="/myAccount" id="sidebarList"><strong>My Account</strong></Link>
            </ListGroup.Item>
        </ListGroup>
    );
};

export default Sidebar;