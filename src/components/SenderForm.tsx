import React, { useEffect, useState} from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { ChangeEvent } from 'react';


type SenderFormProps = {
    onChange: (details: SenderDetails) => void;
  };
  
  type SenderDetails = {
    sender_name: string;
    sender_street_address: string;
    sender_postal_code: string;
    sender_city: string;
    sender_telephone: string;
    sender_email: string;
    desired_dropoff_locker: number; 
  };
  
  const SenderForm: React.FC<SenderFormProps> = ({ onChange }: SenderFormProps) => {
    const [senderDetails, setSenderDetails] = useState<SenderDetails>({
      sender_name: '',
      sender_street_address: '',
      sender_postal_code: '',
      sender_city: '',
      sender_telephone: '',
      sender_email: '',
      desired_dropoff_locker: 0, 
    });

    useEffect(() => {
      onChange(senderDetails);
    }, [senderDetails]);
  
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
      // Optionally, you can reset the form or perform other actions after saving
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="senderName">
          <Form.Label style={{ fontWeight: 'bold' }}>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={senderDetails.sender_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderStreetAddress">
          <Form.Label style={{ fontWeight: 'bold' }}>Street Address</Form.Label>
          <Form.Control
            type="text"
            name="streetAddress"
            value={senderDetails.sender_street_address}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderPostalCode">
          <Form.Label style={{ fontWeight: 'bold' }}>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            value={senderDetails.sender_postal_code}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderCity">
          <Form.Label style={{ fontWeight: 'bold' }}>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={senderDetails.sender_city}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderPhoneNumber">
          <Form.Label style={{ fontWeight: 'bold' }}>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={senderDetails.sender_telephone}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderEmail">
          <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={senderDetails.sender_email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group controlId="chooseLocker">
            <Form.Label style={{ fontWeight: 'bold' }}>Choose Dropoff Locker</Form.Label>
            <Form.Control as="select" onChange={handleSelectLocker as any} value={senderDetails.desired_dropoff_locker}>
              <option value="">Select a Locker</option>
              <option value="locker1">Locker 1</option>
              <option value="locker2">Locker 2</option>
              <option value="locker3">Locker 3</option>
              <option value="locker4">Locker 4</option>
              <option value="locker5">Locker 5</option>
            </Form.Control>
        </Form.Group>
      </Form>
    );
  };
  
  export default SenderForm;