import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { parcel_status, locker_location } from '../components/statuses';
import { Link } from "react-router-dom";
import { useParcelContext } from "../contexts/parcelContext";
//1202 new code, for userAuth


interface ParcelType {
    id_parcel: number;
    sender_name: string;
    status: string;
    parcel_pickup_date: Date;
    parcel_last_pickup_date: Date;
    reciever_name: string;
    locker_location: number;
};
interface ParcelContextType {
    incomingParcels: ParcelType[];
};

const Home = () => {

    const { incomingParcels } = useParcelContext() as ParcelContextType;
    const [selectedParcel, setSelectedParcel] = useState<any>(null);

    const handleClick = (event: any, parcel: any) => {
        event.preventDefault();
        setSelectedParcel(parcel);
    };

    const incomingList = (incomingParcels.length > 0) ? incomingParcels.map((parcel: any) =>
        <ListGroup key={parcel.id_parcel} as="ol" variant='flush'>
            <ListGroup.Item
                as="li"
                className="align-items-start customListRow"
                action onClick={(event) => handleClick(event, parcel)}>
                <Row>
                    <Col xs={4}>
                        <div>{parcel.sender_name}</div>
                    </Col>
                    <Col>
                        <div>{parcel_status(parcel.status)}</div>
                    </Col>
                    <Col>
                        <div>{parcel.parcel_pickup_date?.slice(0, 10) || "Becoming"}</div>
                    </Col>
                </Row>
            </ListGroup.Item>
        </ListGroup>
    ) : (<div style={{ paddingLeft: '5%' }}>There are no incoming parcels at the moment</div>
    );

    return (
        <Container className="home">
            <Row className="mt-10">
                <Col xs={2} className="sidebar mr-7">
                    <Sidebar />
                </Col>
                <Col xs={6} className="homeMain">
                    <div>
                        <h3 className="mainHeader">Welcome to recieve and send parcels!</h3>
                    </div>
                    <div>
                        <h5 id="incomingHeader">Incoming parcels with <strong>sender name</strong>, <strong>parcel status</strong>, and <strong>pickup date</strong>:</h5>
                    </div>
                    <div>
                        <div>{incomingList}</div>
                    </div>
                    <div className="sendParcel">
                        <h4>Start sending a new parcel</h4>
                        <div>You need following information to send a parcel: sender and receiver details: name, address, telephone number, and email. Please measure the parcel size as well: width, height, depth (cm), and mass (kg).</div>
                        <Link to="/sendNewParcel" className="btn btn-danger" style={{ marginTop: '2%' }}>Go to send a New Parcel</Link>
                    </div>
                </Col>
                <Col xs={4} className="parcelDetails">
                    <div id="header">
                        <h5>Parcel details</h5>
                    </div>
                    <div id="detailList">
                        {selectedParcel ? (
                            <div>
                                <div><strong>Sender name:</strong> {selectedParcel.sender_name}</div>
                                <div><strong>Recipient name:</strong> {selectedParcel.reciever_name}</div>
                                <div><strong>Parcel left for transportation:</strong> {selectedParcel.parcel_dropoff_date?.slice(0, 10) || "Pending"}</div>
                                <div><strong>Parcel ready for pickup:</strong> {(selectedParcel.parcel_readyforpickup_date)?.slice(0, 10) || "Becoming"}</div>
                                {selectedParcel.status === "parcel_in_pickup_locker" ? (
                                    <div><strong>Pick up before:</strong> {(selectedParcel.parcel_last_pickup_date)?.slice(0, 10) || "Becoming"}</div>)
                                    : (<div><strong>Pickup date:</strong> {(selectedParcel.parcel_pickup_date)?.slice(0, 10) || "Becoming"}</div>
                                    )}
                                <div><strong>Parcel weight:</strong> {selectedParcel.parcel_mass} kg</div>
                                <div><strong>Size:</strong> {selectedParcel.parcel_width} cm x {selectedParcel.parcel_height} cm x {selectedParcel.parcel_depth} cm</div>
                                {selectedParcel.status === "parcel_in_pickup_locker" ? (
                                    <div>
                                        <div><strong>Parcel locker location:</strong> {locker_location(selectedParcel.alternative_pickup_locker ? selectedParcel.alternative_pickup_locker : selectedParcel.selected_pickup_locker)}</div>
                                        <h4 style={{ paddingTop: '3%' }}>Locker pickup code: {selectedParcel.pin_code}</h4>
                                    </div>
                                ) : null}
                                <div style={{ paddingTop: '3%' }}>
                                    {selectedParcel.status === "parcel_in_transportation" ? (
                                        <h5>Parcel is transported for pickup</h5>
                                    ) : null}
                                </div>

                            </div>
                        ) : (
                            <div>Select a parcel to view detailed information</div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;