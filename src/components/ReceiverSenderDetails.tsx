import React, { useState } from 'react';
import { Col, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReceiverForm from './ReceiverForm';
import SenderForm from './SenderForm';
import sendNewParcel from '../styling/sendNewParcel.css';

interface ReceiverSenderDetailsProps {
    onChange: () => void;
}


const ReceiverSenderDetails = (props: ReceiverDetails, SenderDetail ) => {

    return (
        <Col xs={8}>
            <div className="receiverSenderDetails">
                <h3>Please fill in here receiver and sender details</h3>
                    <h4 className="margin-top-30">Receiver's details</h4>
                        <ReceiverForm onChange={props.onChange} />
                    <h4 className="margin-top-30">Sender's details</h4>
                        <SenderForm onChange={props.onChange} />
            </div>
        </Col>
    );
};

export default ReceiverSenderDetails;

function setReceiverDetails(details: any) {
    throw new Error('Function not implemented.');
}
function setSenderDetails(details: any) {
    throw new Error('Function not implemented.');
}

