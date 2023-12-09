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
    sentParcels: ParcelType[];
};
const SentParcels = () => {
    const { sentParcels } = useParcelContext() as ParcelContextType;
    const [selectedParcel, setSelectedParcel] = useState<any>(null);

    const handleClick = (event: any, parcel: any) => {
        event.preventDefault();
        setSelectedParcel(parcel);
    };

    const surveyList = (sentParcels.length > 0) ? sentParcels.map((parcel: any) =>
        <ListGroup key={parcel.id_parcel} as="ol" variant='flush'>
            <ListGroup.Item
                as="li"
                className="align-items-start"
                action onClick={(event) => handleClick(event, parcel)}
                style={{ borderBottom: '1px solid #ccc' }}>
                <Row>
                    <Col xs={4}>
                        <div>{parcel.reciever_name}</div>
                    </Col>
                    <Col>
                        <div>{parcel_status(parcel.status)}</div>
                    </Col>
                    <Col>
                        {parcel.status === 3 ? (
                            <div>{(parcel.parcel_last_pickup_date)?.slice(0, 10) || "Becoming"} latest</div>)
                            : (<div>{(parcel.parcel_pickup_date)?.slice(0, 10) || "Becoming"}</div>)}
                    </Col>
                </Row>
            </ListGroup.Item>
        </ListGroup>
    ) : (<div style={{ paddingLeft: '5%' }}>You have not sent any parcels yet</div>
    );

    return (
        <Container>
            <Row>
                <Col xs={6} md={4} lg={2} className="sidebar">
                    <Sidebar />
                </Col>
                <Col xs={12} md={8} lg={6} className="sentList">
                    <div>
                        <h3 className="mainHeader">Parcels sent by you</h3>
                    </div>
                    <Row id="header">
                        <Col xs={4}><h5>Recipient</h5></Col>
                        <Col><h5>Status</h5></Col>
                        <Col><h5>Pickup date</h5></Col>
                    </Row>
                    <div>
                        {surveyList}
                    </div>
                </Col>
                <Col xs={12} md={8} lg={4} className="parcelDetails">
                    <div id="header">
                        <h5>Parcel details</h5>
                    </div>
                    <div id="detailList">
                        {selectedParcel ? (
                            <div>
                                <div><strong>Sender name:</strong> {selectedParcel.sender_name}</div>
                                <div><strong>Recipient name:</strong> {selectedParcel.reciever_name}</div>
                                <div><strong>Parcel ready for pickup:</strong> {(selectedParcel.parcel_readyforpickup_date)?.slice(0, 10) || "Becoming"}</div>
                                {selectedParcel.status === 3 ? (
                                    <div><strong>Pick up before:</strong> {(selectedParcel.parcel_last_pickup_date)?.slice(0, 10) || "Becoming"}</div>)
                                    : (<div><strong>Pickup date:</strong> {(selectedParcel.parcel_pickup_date)?.slice(0, 10) || "Becoming"}</div>
                                    )}
                                <div><strong>Parcel weight:</strong> {selectedParcel.parcel_mass} kg</div>
                                <div><strong>Size:</strong> {selectedParcel.parcel_width} cm x {selectedParcel.parcel_height} cm x {selectedParcel.parcel_depth} cm</div>
                                {selectedParcel.status === "parcel_in_pickup_locker" ? (
                                    <div>
                                        <div><strong>Parcel locker location:</strong> {locker_location(selectedParcel.alternative_pickup_locker ? selectedParcel.alternative_pickup_locker : selectedParcel.selected_pickup_locker)}</div>
                                        <h4 style={{paddingTop: '2%'}}>Locker pickup code: {selectedParcel.pin_code}</h4>
                                    </div>
                                ) : null}
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

export default SentParcels;