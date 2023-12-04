import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import logo from '../images/logo.png';
import '../App.css'


const FrontPage = () => {
    return (
        <Container className="frontPageMain">
            <Row className="mt-10">
                <Col xs={4}>
                    <div>
                        <img src={logo} width="300" alt="logo" />
                    </div>
                </Col>
                <Col xs={8}>
                    <div>
                        <h2>Welcome to DeliverMe!</h2>
                        <h4>DeliverMe is reliable parcel delivery service that allows you to send and receive parcels without delays.</h4>
                        <h4>Our service is available in all major cities in Finland and our locker system allows flexible and fastt delivery.</h4>
                    </div>
                </Col>
            </Row>
            <Row className="mt-10 buttonsRow">
                <Col xs={5}>
                    <div>
                        <button className='sendbtn'>Sign in</button>
                        <div>Allready a user? Please sign in</div>
                    </div>
                </Col>
                <Col xs={5}>
                    <div>
                        <button className='sendbtn'>Register</button>
                        <div>Not a registered user yet?</div>
                        <div>Please register here</div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default FrontPage;