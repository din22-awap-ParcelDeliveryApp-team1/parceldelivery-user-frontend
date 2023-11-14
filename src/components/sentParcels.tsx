import React, { useState } from 'react';
import Sidebar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useDataContext } from '../contexts/dataContext';


const SentParcels = () => {
    const { getReceivedParcels, getSentParcels } = useDataContext();
    const [ sentParcels, setSentParcels ] = useState<any>([]);
    const [ receivedParcels, setReceivedParcels ] = useState<any>([]);


    return (
        <Container className="home">
        <Row className="mt-10">
            <Col xs={4} className="sidebar mr-7">
                <Sidebar />
            </Col>
            <Col xs={4}>
                <div className="home">
                    <h3>Sent parcels</h3>
                </div>
            </Col>
            <Col xs={4}>
                <div className="home">
                <h3>Parcel information</h3>
                </div>
            </Col>
        </Row>
    </Container>  
    )

};

export default SentParcels;