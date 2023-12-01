import React from "react";
import Sidebar from '../components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

type UserInfoProps = {
    firstName?: string;
    lastName?: string;
    address?: string;
    postalCode?: string;
    city?: string;
    phoneNumber?: string;
    email?: string;
  };
  

const MyAccount: React.FC<UserInfoProps> = ({
    firstName,
    lastName,
    address,
    postalCode,
    city,
    phoneNumber,
    email
  }) => {
    return (
        <Container>
        <Row>
          <Col xs={2} className="sidebar">
            <Sidebar />
          </Col>
          <Col xs={9} md={10} className="user-info">
          <div>
            <strong>First name:</strong> 
          </div>
          <div>
            <strong>Last name:</strong>
          </div>
          <div>
            <strong>Address:</strong> 
          </div>
          <div>
            <strong>Postal code:</strong> 
          </div>
          <div>
            <strong>City:</strong> 
          </div>
          <div>
            <strong>Phone number:</strong> 
          </div>
          <div>
            <strong>Email:</strong> 
          </div>
          <button onClick={() => {/* logic to edit information */}}>
            Edit information
          </button>
          <button onClick={() => {/* logic to delete account */}}>
            Delete account
          </button>
        </Col>
      </Row>
        </Container>
     
    );
  };
  
  export default MyAccount;