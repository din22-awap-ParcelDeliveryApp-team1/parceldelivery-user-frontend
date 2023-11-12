import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';


const Sidebar = () => {
    return (
        <ListGroup as="ul" variant="flush">
            <ListGroup.Item>
                <Link to="/incomingParcels">Incoming Parcels</Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link to="/sendNewParcel">Send a New Parcel</Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link to="/sentParcels">Sent Parcels</Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link to="/receivedParcels">Received Parcels</Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link to="/myAccount">My Account</Link>
            </ListGroup.Item>
        </ListGroup>
    );
};

export default Sidebar;