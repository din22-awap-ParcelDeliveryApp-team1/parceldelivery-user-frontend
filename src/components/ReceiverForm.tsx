import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';


type ReceiverFormProps = {
  onChange: (details: ReceiverDetails) => void;
};

export type ReceiverDetails = {
  reciever_name: string;
  reciever_street_address: string;
  reciever_postal_code: string;
  reciever_city: string;
  reciever_telephone: string;
  receiver_email: string;
  desired_pickup_locker: number; 
};

const ReceiverForm: React.FC<ReceiverFormProps> = ({ onChange }: ReceiverFormProps) => {
  const [receiverDetails, setReceiverDetails] = useState<ReceiverDetails>({
    reciever_name: '',
    reciever_street_address: '',
    reciever_postal_code: '',
    reciever_city: '',
    reciever_telephone: '',
    receiver_email: '',
    desired_pickup_locker: 0,
  });

  useEffect(() => {
    onChange(receiverDetails);
  }, [receiverDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReceiverDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSelectLocker: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedLocker = e.target.value;
    setReceiverDetails((prevDetails) => ({ ...prevDetails, selectedLocker }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Optionally, you can reset the form or perform other actions after saving
  };
  
  return (
    <Form  onSubmit={handleSubmit}>
      <Form.Group controlId="receiverName">
        <Form.Label style={{ fontWeight: 'bold' }}>Name</Form.Label>
        <Form.Control
          type="text"
          name="reciever_name"
          value={receiverDetails.reciever_name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="streetAddress">
        <Form.Label style={{ fontWeight: 'bold' }}>Street Address</Form.Label>
        <Form.Control
          type="text"
          name="streetAddress"
          value={receiverDetails.reciever_street_address}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="postalCode">
        <Form.Label style={{ fontWeight: 'bold' }}>Postal Code</Form.Label>
        <Form.Control
          type="text"
          name="postalCode"
          value={receiverDetails.reciever_postal_code}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="city">
        <Form.Label style={{ fontWeight: 'bold' }}>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={receiverDetails.reciever_city}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="phoneNumber">
        <Form.Label style={{ fontWeight: 'bold' }}>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          name="phoneNumber"
          value={receiverDetails.reciever_telephone}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={receiverDetails.receiver_email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="chooseLocker">
            <Form.Label style={{ fontWeight: 'bold' }}>Choose Pick-up Locker</Form.Label>
            <Form.Control as="select" onChange={handleSelectLocker as any} value={receiverDetails.desired_pickup_locker}>
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

export default ReceiverForm;