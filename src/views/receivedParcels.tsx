import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParcelContext } from '../contexts/parcelContext';
import { parcel_status, locker_location } from '../components/statuses';

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
    receivedParcels: ParcelType[];
};
const ReceivedParcels = () => {
    const { receivedParcels } = useParcelContext() as ParcelContextType;
    const  [selectedParcel, setSelectedParcel ] = useState<any>(null);

    const handleClick = (event: any, parcel: any) => {
        event.preventDefault();
        setSelectedParcel(parcel);
    };

    const surveyList = receivedParcels.map((parcel: any) =>
        <ListGroup key={parcel.id_parcel} as="ol" variant='flush'>
            <ListGroup.Item
                as="li"
                className="align-items-start"
                action onClick={(event) => handleClick(event, parcel)}>
                <Row>
                    <Col xs={5}>
                        <div className="fw-bold">{parcel.sender_name}</div>
                    </Col>
                    <Col>
                        <div className="fw-bold">{parcel_status(parcel.status)}</div>
                    </Col>
                    <Col>
                        {parcel.status === 3 ? (
                            <div className="fw-bold">{(parcel.parcel_last_pickup_date).slice(0, 10)} latest</div>)
                            : (<div className="fw-bold">{(parcel.parcel_pickup_date).slice(0, 10)}</div>)}
                    </Col>
                </Row>
            </ListGroup.Item>
        </ListGroup>
    );

    return (
        <Container>
            <Row>
                <Col xs={2} className="sidebar">
                    <Sidebar />
                </Col>
                <Col xs={6} className="sentList">
                    <div>
                        <h3 id="mainHeader">Received parcels</h3>
                    </div>
                    <Row id="header">
                        <Col xs={5}><h5>Sender name</h5></Col>
                        <Col><h5>Status</h5></Col>
                        <Col><h5>Pickup date</h5></Col>
                    </Row>
                    <div>
                        {surveyList}
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
                                <div><strong>Parcel ready for pickup:</strong> {(selectedParcel.parcel_readyfor_pickup_date).slice(0, 10)}</div>
                                {selectedParcel.status === 3 ? (
                                    <div><strong>Pick up before:</strong> {(selectedParcel.parcel_last_pickup_date).slice(0, 10)}</div>)
                                    : (<div><strong>Pickup date:</strong> {(selectedParcel.parcel_pickup_date).slice(0, 10)}</div>
                                    )}
                                <div><strong>Parcel weight:</strong> {selectedParcel.parcel_mass} kg</div>
                                <div><strong>Size:</strong> {selectedParcel.parcel_width} cm x {selectedParcel.parcel_height} cm x {selectedParcel.parcel_depth} cm</div>
                                {selectedParcel.status === 3 ? (
                                    <div>
                                        <div><strong>Parcel locker location:</strong> {locker_location(selectedParcel.parcel_pickup_locker)}</div>
                                        <div><strong>Pickup code:</strong> {selectedParcel.parcel_pickup_code}</div>
                                    </div>)
                                    : null}
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

export default ReceivedParcels;