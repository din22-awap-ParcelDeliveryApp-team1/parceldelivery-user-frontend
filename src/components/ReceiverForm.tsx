import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';


type ReceiverFormProps = {
  onSaveReceiverDetails: (details: ReceiverDetails) => void;
};

export type ReceiverDetails = {
  name: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
  email: string;
};

const ReceiverForm: React.FC<ReceiverFormProps> = ({ onSaveReceiverDetails }: ReceiverFormProps) => {
  const [receiverDetails, setReceiverDetails] = useState<ReceiverDetails>({
    name: '',
    streetAddress: '',
    postalCode: '',
    city: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReceiverDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSaveReceiverDetails(receiverDetails);
    // Optionally, you can reset the form or perform other actions after saving
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="receiverName">
        <Form.Label style={{ fontWeight: 'bold' }}>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={receiverDetails.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="streetAddress">
        <Form.Label style={{ fontWeight: 'bold' }}>Street Address</Form.Label>
        <Form.Control
          type="text"
          name="streetAddress"
          value={receiverDetails.streetAddress}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="postalCode">
        <Form.Label style={{ fontWeight: 'bold' }}>Postal Code</Form.Label>
        <Form.Control
          type="text"
          name="postalCode"
          value={receiverDetails.postalCode}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="city">
        <Form.Label style={{ fontWeight: 'bold' }}>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={receiverDetails.city}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="phoneNumber">
        <Form.Label style={{ fontWeight: 'bold' }}>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          name="phoneNumber"
          value={receiverDetails.phoneNumber}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={receiverDetails.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
    </Form>
  );
};

export default ReceiverForm;