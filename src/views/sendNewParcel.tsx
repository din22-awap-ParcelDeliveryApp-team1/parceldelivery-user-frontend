import "../styling/sendNewParcel.css";
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/sidebar";
import ParcelSize from "../components/ParcelSize";
import ParcelSizeImage from "../components/ParcelSizeImage";
import SendParcelConfirm from "../components/SendParcelConfirm";
import ReceiverSenderDetails from "../components/ReceiverSenderDetails";

export interface SendParcel{
  id_parcel: number;
  id_user?: number | null;
  reciever_name: string;
  reciever_telephone: string;
  reciever_street_address: string;
  reciever_postal_code: string;
  reciever_city: string;
  sender_name: string;
  sender_telephone?: string | null;
  sender_street_address?: string | null;
  sender_postal_code?: string | null;
  sender_city?: string | null;
  parcel_dropoff_date?: Date | null;
  parcel_readyforpickup_date?: Date | null;
  parcel_pickup_date?: Date | null;
  parcel_last_pickup_date?: Date | null;
  pin_code?: number | null;
  status: 'ready_to_deliver' | 'parcel_at_dropoff_locker' | 'parcel_in_transportation' | 'parcel_in_pickup_locker' | 'reciever_recieved_parcel';
  desired_dropoff_locker: number;
  desired_pickup_locker: number;
  alternative_pickup_locker?: number | null;
  parcel_height: number;
  parcel_width: number;
  parcel_depth: number;
  parcel_mass: number;
  receiver_email: string;
  sender_email: string;
}

async function postParcelToBackend(parcelData: SendParcel): Promise<Response> {
   // Format the dates without the time part
   const formattedParcelData = {
      ...parcelData,
    parcel_dropoff_date: parcelData.parcel_dropoff_date?.toISOString() || null,
    parcel_readyforpickup_date: parcelData.parcel_readyforpickup_date?.toISOString() || null,
    parcel_pickup_date: parcelData.parcel_pickup_date?.toISOString() || null,
    parcel_last_pickup_date: parcelData.parcel_last_pickup_date?.toISOString() || null,
    };
  const response = await fetch('http://localhost:3001/parcel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_user: parcelData.id_user,
      reciever_name: parcelData.reciever_name,
      reciever_telephone: parcelData.reciever_telephone,
      reciever_street_address: parcelData.reciever_street_address,
      reciever_postal_code: parcelData.reciever_postal_code,
      reciever_city: parcelData.reciever_city,
      sender_name: parcelData.sender_name,
      sender_telephone: parcelData.sender_telephone || null,
      sender_street_address: parcelData.sender_street_address || null,
      sender_postal_code: parcelData.sender_postal_code || null,
      sender_city: parcelData.sender_city || null,
      parcel_dropoff_date: parcelData.parcel_dropoff_date || null,
      parcel_readyforpickup_date: parcelData.parcel_readyforpickup_date || null,
      parcel_pickup_date: parcelData.parcel_pickup_date || null,
      parcel_last_pickup_date: parcelData.parcel_last_pickup_date || null,
      pin_code: parcelData.pin_code || null,
      status: parcelData.status,
      desired_dropoff_locker: parcelData.desired_dropoff_locker,
      desired_pickup_locker: parcelData.desired_pickup_locker,
      alternative_pickup_locker: parcelData.alternative_pickup_locker || null,
      parcel_height: parcelData.parcel_height,
      parcel_width: parcelData.parcel_width,
      parcel_depth: parcelData.parcel_depth,
      parcel_mass: parcelData.parcel_mass,
      receiver_email: parcelData.receiver_email,
      sender_email: parcelData.sender_email,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to post parcel. Status: ${response.status}`);
  }
  return response;
}

const SendNewParcel = () => {
  const [step, setStep] = useState<number>(1);

  const goToNextStep = () => {
    setStep(step + 1);
  };
  const goToPreviousStep = () => {
    setStep(step - 1);
  };

  const goToConfirm = async () => {
    try {
        const response = await postParcelToBackend(parcelData);
        if (response.ok) {
            // Parse the response to get the pin code
            const responseData = await response.json();
            const pinCode = responseData.pin_code;
            console.log('Pin Code:', pinCode);

            // Update the state with the pin code
            setParcelData((prevParcelData) => ({ ...prevParcelData, pin_code: pinCode }));
            goToNextStep();
        } else {
            console.error('Failed to post parcel. Status:', response.status);
        }
    } catch (error) {
        console.error('Error saving data', error);
    }
};
  const [parcelData, setParcelData] = useState<SendParcel>({
    id_parcel: 1,
    id_user: 1,
    reciever_name: '',
    reciever_telephone: '',
    reciever_street_address: '',
    reciever_postal_code: '',
    reciever_city: '',
    sender_name: '',
    sender_telephone: '',
    sender_street_address: '',
    sender_postal_code: '',
    sender_city: '',
    parcel_dropoff_date: new Date(),
    parcel_readyforpickup_date: new Date(),
    parcel_pickup_date: new Date(),
    parcel_last_pickup_date: new Date(),
    pin_code: 0,
    status: 'ready_to_deliver',
    desired_dropoff_locker: 0,
    desired_pickup_locker: 0,
    alternative_pickup_locker: 0,
    parcel_height: 0,
    parcel_width: 0,
    parcel_depth: 0,
    parcel_mass: 0,
    receiver_email: '',
    sender_email: '',
  });

  const onChange = (newParcelData: SendParcel) => {
    if(newParcelData.parcel_dropoff_date){
      newParcelData.parcel_readyforpickup_date = 
        new Date(newParcelData.parcel_dropoff_date.getTime()+ 4*24*60*60*1000);
    }
    setParcelData({...parcelData, ...newParcelData});
  }

  return (
    <Container className="sendNewParcel">
      <Row className="mt-3">
        <Col xs={2} className="sidebar mr-2">
          <Sidebar />
        </Col>
        <Col xs={10}>
          <div className="sendNewParcel">
            {step === 1 && (
              <div>
                <Row>
                  <Col xs={6}>
                    <div className="parcelSize">
                      <ParcelSize onChange={onChange} />
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="parcelSizeImage">
                      <ParcelSizeImage />
                    </div>
                  </Col>
                </Row>
                <div /* className="d-flex justify-content-end" */>
                  <Row>
                    <Col xs={6} className="d-flex justify-content-end">
                      <Button
                        variant="primary"
                        onClick={goToNextStep}
                        style={{ marginTop: '10px', padding: '8px 16px' }}
                      >
                        Next
                      </Button>{' '}
                    </Col>
                    <Col xs={6}>
                      {/* Content for the second column */}
                    </Col>
                  </Row>
                </div>
              </div>
            )}            
            {step === 2 && (
              <div>
                <Row>
                  <Col xs={12}>
                <div className="receiverSenderDetails">
                  <ReceiverSenderDetails onChange={onChange} />
                </div>
                <div>
                  <Row>
                    <Col xs={6}>
                      <Button onClick={goToPreviousStep}
                        style={{ marginTop: '10px', padding: '8px 16px' }}>Back
                      </Button>{' '}
                    </Col>
                    <Col xs={6}>
                      <Button onClick={goToNextStep} className="ml-auto"
                        style={{ marginTop: '10px', padding: '8px 16px'}}>Next
                      </Button>{' '}
                    </Col>
                  </Row>
                </div>
              </Col>
              </Row>
              </div>
            )}
            {step === 3 && (
              <div>
                <div className="sendConfirm">
                  <SendParcelConfirm parcelData={parcelData}/>
                </div>
                <div>
                <Row>
                    <Col xs={6}>
                      <Button onClick={goToPreviousStep} 
                        style={{ padding: '8px 16px' }}>Back
                      </Button>{' '}
                    </Col>
                    <Col xs={6}>
                      <Button onClick={goToConfirm} 
                        style={{  padding: '8px 16px' }}>Confirm
                      </Button>{' '}
                    </Col>
                </Row>
                </div>
              </div>
            )}
          </div>
          {step === 4 && (
              <div>
                <div className="sendConfirm">
                  <h5>Your order has been confirm! The pin code is {parcelData.pin_code}. Please follow the steps below!</h5>
                  <div className="stepSend">
                    <p><strong>Step 1:</strong> Bring your parcel to the selected dropoff locker.</p>
                    <p><strong>Step 2:</strong> Enter the pin code to the touch screen to open the cabinet.</p>
                    <p><strong>Step 3:</strong> Place the parcel inside the cabinet, close the door and you are done!</p>
                  </div>
                </div>
                <Link to="/home">
                  <Button style={{ margin: '10px', padding: '8px 16px' }}>Back to Home page</Button>
                </Link>
              </div>
            )}
        </Col>
      </Row>
    </Container>
  );
};

export default SendNewParcel;
