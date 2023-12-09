import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import '../App.css';


const FrontPage = () => {
    return (
        <Container className="frontPageMain">
            <Row className="mt-10">
                <Col xs={12} md={12} lg={4}>
                    <div className="imgDiv">
                        <img className="logoMain" src={logo} alt="logo" />
                    </div>
                </Col>
                <Col xs={12} md={12} lg={8}>
                    <div>
                        <div className="welcome">Welcome to DeliverMe!</div>
                        <div className='text'>DeliverMe is reliable parcel delivery service that allows you to send and receive parcels without delays.</div>
                        <div className='text'>Our service is available in all major cities in Finland and our locker system allows flexible and fastt delivery.</div>
                    </div>
                </Col>
            </Row>
            <Row className="mt-10 buttonsRow">
                <Col xs={12} md={5}>
                    <div className='buttonDiv'>
                        <Link to="/Signin">
                            <button className='sendbtn' >Sign in</button>
                        </Link>
                        <div>Allready a user? Please sign in</div>
                    </div>
                </Col>
                <Col xs={12} md={5}>
                    <div className='buttonDiv'>
                        <Link to="/Register">
                            <button className='sendbtn'>Register</button>
                        </Link>
                        <div>Not a registered user yet?</div>
                        <div>Please register here</div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default FrontPage;