import React, { useEffect, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import {locker_location} from './statuses';
import Map from './Map';

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

  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    onChange(receiverDetails);
  }, [receiverDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReceiverDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSelectLocker: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedLocker = parseInt(e.target.value, 10);
    console.log(selectedLocker);
    setReceiverDetails((prevDetails) => ({ ...prevDetails, desired_pickup_locker: selectedLocker  }));
  };

  const handleViewMapClick = () => {
    setIsMapVisible(!isMapVisible);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  
  return (
    <Row>
    <Col md={8}>
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
          name="reciever_street_address"
          value={receiverDetails.reciever_street_address}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="postalCode">
        <Form.Label style={{ fontWeight: 'bold' }}>Postal Code</Form.Label>
        <Form.Control
          type="text"
          name="reciever_postal_code"
          value={receiverDetails.reciever_postal_code}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="city">
        <Form.Label style={{ fontWeight: 'bold' }}>City</Form.Label>
        <Form.Control
          type="text"
          name="reciever_city"
          value={receiverDetails.reciever_city}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="phoneNumber">
        <Form.Label style={{ fontWeight: 'bold' }}>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          name="reciever_telephone"
          value={receiverDetails.reciever_telephone}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
        <Form.Control
          type="email"
          name="receiver_email"
          value={receiverDetails.receiver_email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="chooseLocker">
          <Form.Label style={{ fontWeight: 'bold' }}>Choose Pick-up Locker</Form.Label>
                <Button variant="link" onClick={handleViewMapClick}> 
                  <strong>View Locker Map</strong>
                </Button>
            <Form.Control as="select" onChange={handleSelectLocker as any} 
              value={receiverDetails.desired_pickup_locker}>
                <option value="">Select a Locker </option>
                <option value="1">{locker_location(1)}</option>
                <option value="2">{locker_location(2)}</option>
                <option value="3">{locker_location(3)}</option>
                <option value="4">{locker_location(4)}</option>
                <option value="5">{locker_location(5)}</option>
            </Form.Control>
      </Form.Group>

    </Form>
    </Col>
    <Col md={4}>
        {isMapVisible && <Map />} 
      </Col>
    </Row>
  );
};
export default ReceiverForm;