import React, { useState} from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { ChangeEvent } from 'react';


type SenderFormProps = {
    onSaveSenderDetails: (details: SenderDetails) => void;
  };
  
  type SenderDetails = {
    name: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    phoneNumber: string;
    email: string;
    selectedLocker: any; // Add a field for the selected locker
  };
  
  const SenderForm: React.FC<SenderFormProps> = ({ onSaveSenderDetails }: SenderFormProps) => {
    const [senderDetails, setSenderDetails] = useState<SenderDetails>({
      name: '',
      streetAddress: '',
      postalCode: '',
      city: '',
      phoneNumber: '',
      email: '',
      selectedLocker: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSenderDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleSelectLocker: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const selectedLocker = e.target.value;
        setSenderDetails((prevDetails) => ({ ...prevDetails, selectedLocker }));
      };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSaveSenderDetails(senderDetails);
      // Optionally, you can reset the form or perform other actions after saving
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="senderName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={senderDetails.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderStreetAddress">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            name="streetAddress"
            value={senderDetails.streetAddress}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderPostalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            value={senderDetails.postalCode}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={senderDetails.city}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={senderDetails.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={senderDetails.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Row>
        <Col md={6}>
          <Form.Group controlId="chooseLocker">
            <Form.Label>Choose Dropoff Locker</Form.Label>
            <Form.Control as="select" onChange={handleSelectLocker as any} value={senderDetails.selectedLocker}>
              <option value="">Select a Locker</option>
              <option value="locker1">Locker 1</option>
              <option value="locker2">Locker 2</option>
              <option value="locker3">Locker 3</option>
              {/* Add more options as needed */}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

        <Button type="submit">Save Sender Details</Button>
      </Form>
    );
  };
  
  export default SenderForm;