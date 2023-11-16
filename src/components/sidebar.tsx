import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';


const Sidebar = () => {

    return (
        <ListGroup as="ol" variant="flush" className="mt-5 ">
            <ListGroup.Item id="sidebarListItem">
                <Link to="/incomingParcels" id="sidebarList">Incoming Parcels</Link>
            </ListGroup.Item>
            <ListGroup.Item id="sidebarListItem">
                <Link to="/sendNewParcel" id="sidebarList">Send a New Parcel</Link>
            </ListGroup.Item>
            <ListGroup.Item id="sidebarListItem">
                <Link to="/sentParcels" id="sidebarList">Sent Parcels</Link>
            </ListGroup.Item>
            <ListGroup.Item id="sidebarListItem">
                <Link to="/receivedParcels" id="sidebarList">Received Parcels</Link>
            </ListGroup.Item>
            <ListGroup.Item id="sidebarListItem">
                <Link to="/myAccount" id="sidebarList">My Account</Link>
            </ListGroup.Item>
        </ListGroup>
    );
};

export default Sidebar;