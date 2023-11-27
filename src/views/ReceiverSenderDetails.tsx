import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { ArrowLeftCircle, ArrowRightCircle} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import ReceiverForm from '../components/ReceiverForm';
import SenderForm from '../components/SenderForm';

const ReceiverSenderDetails = (details: any) => {
    const handleSaveReceiverDetails = (details: any) => {
        setReceiverDetails(details);
        // You can perform additional actions with receiverDetails if needed
    };
    const handleSaveSenderDetails = (details: any) => {
        setSenderDetails(details);
        // You can perform additional actions with receiverDetails if needed
    };

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <div className="receiverSenderDetails">
                        <h3>Please fill in here receiver and sender details</h3>
                        <h4>Receiver's details</h4>
                        <ReceiverForm onSaveReceiverDetails={handleSaveReceiverDetails} />
                        <h4>Sender's details</h4>
                        <SenderForm onSaveSenderDetails={handleSaveSenderDetails} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ReceiverSenderDetails;

function setReceiverDetails(details: any) {
    throw new Error('Function not implemented.');
}
function setSenderDetails(details: any) {
    throw new Error('Function not implemented.');
}

