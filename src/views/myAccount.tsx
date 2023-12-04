import React from "react";
import Sidebar from '../components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../styling/module.css';
//import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';

type UserInfoProps = {
  first_name?: string;
  last_name?: string;
  email?: string;
  telephone?: string;
  street_address?: string;
  postal_code?: string;
  city?: string;
  user_name?: string;
  password?: string;
  confirmPassword?: string;
  };
  

const MyAccount: React.FC<UserInfoProps> = ({
  first_name,
  last_name,
  email,
  telephone,
  street_address,
  postal_code,
  city,
  user_name,
  password,
  confirmPassword,
  }) => {
    //after click, it will link to edit user info page
    const navigate = useNavigate();

    return (
        <Container className="account-container">
        <Row>
          <Col xs={12} md={3} className="sidebar">
            <Sidebar />
          </Col>
          <Col xs={12} md={9} className="user-info">
          <div >
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
          <div className="email-div">
            <strong>Email:</strong> 
          </div>
          <button className="edit-button" onClick={() => navigate('/edit-user-info')}>
            Edit information
          </button>
          <button className="delete-button" onClick={() => {/* logic to delete account */}}>
            Delete account
          </button>
        </Col>
      </Row>
        </Container>
     
    );
  };
  
  export default MyAccount;