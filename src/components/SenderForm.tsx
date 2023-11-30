import React, { useEffect, useState} from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { locker_location } from './statuses';
import Map from './Map';


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
    parcel_dropoff_date: Date;
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
      parcel_dropoff_date: new Date(),
    });

    const [isMapVisible, setIsMapVisible] = useState(false);

    useEffect(() => {
      onChange(senderDetails);
    }, [senderDetails]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSenderDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleSelectLocker: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const selectedLocker = parseInt(e.target.value, 10);
        setSenderDetails((prevDetails) => ({ ...prevDetails, desired_dropoff_locker: selectedLocker }));
      };
  
    const handleViewMapClick = () => {
        setIsMapVisible(!isMapVisible);
      };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Optionally, you can reset the form or perform other actions after saving
    };
  
    return (
      <Row>
    <Col md={8}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="senderName">
          <Form.Label style={{ fontWeight: 'bold' }}>Name</Form.Label>
          <Form.Control
            type="text"
            name="sender_name"
            value={senderDetails.sender_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderStreetAddress">
          <Form.Label style={{ fontWeight: 'bold' }}>Street Address</Form.Label>
          <Form.Control
            type="text"
            name="sender_street_address"
            value={senderDetails.sender_street_address}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderPostalCode">
          <Form.Label style={{ fontWeight: 'bold' }}>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="sender_postal_code"
            value={senderDetails.sender_postal_code}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderCity">
          <Form.Label style={{ fontWeight: 'bold' }}>City</Form.Label>
          <Form.Control
            type="text"
            name="sender_city"
            value={senderDetails.sender_city}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderPhoneNumber">
          <Form.Label style={{ fontWeight: 'bold' }}>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="sender_telephone"
            value={senderDetails.sender_telephone}
            onChange={handleChange}
            required
          />
        </Form.Group>
  
        <Form.Group controlId="senderEmail">
          <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
          <Form.Control
            type="email"
            name="sender_email"
            value={senderDetails.sender_email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group controlId="chooseLocker">
          <Form.Label style={{ fontWeight: 'bold' }}>Choose Drop-off Locker</Form.Label>
                <Button variant="link" onClick={handleViewMapClick}> 
                  <strong>View Locker Map</strong>
                </Button>
          <Form.Control as="select" onChange={handleSelectLocker as any} 
            value={senderDetails.desired_dropoff_locker}>
                  <option value="">Select a Locker</option>
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
      <p>
  <strong>Drop-off date:</strong>{' '}
  {senderDetails.parcel_dropoff_date.toLocaleDateString()}
</p>
    </Row>
    );
  }
  
  export default SenderForm;