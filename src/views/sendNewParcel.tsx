import "../styling/sendNewParcel.css";

import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar";
import ParcelSize from "../components/ParcelSize";
import ParcelSizeImage from "../components/ParcelSizeImage";
import ReceiverSenderDetails from "./ReceiverSenderDetails";

const SendNewParcel: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const [showReceiverSenderDetails, setShowReceiverSenderDetails] =
    useState<boolean>(false);

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handleBack = () => {
    setStep(step - 1);
  };
  const handleSaveSize = () => {
    // Assuming you have an API endpoint to save the data to the database
    /* fetch('/api/saveParcelDetails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fragile: fragileChecked,
      fastDelivery: fastDeliveryChecked,
      // Include other relevant data from the user input
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle success, e.g., show a success message
      console.log('Data saved successfully', data);
    })
    .catch((error) => {
      // Handle error, e.g., show an error message
      console.error('Error saving data', error);
    }); */
  };

  return (
    <Container className="sendNewParcel">
      <Row className="mt-3">
        <Col xs={4} className="sidebar mr-2">
          <Sidebar />
        </Col>
        <Col xs={8}>
          <div className="sendNewParcel">
            {step === 1 && (
              <div>
              <h3>Please fill in here package details. Note the maximum size!</h3>
                <Row>
                  <Col xs={6}>
                    <div className="parcelSize">
                      <ParcelSize />
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="parcelSizeImage">
                      <ParcelSizeImage />
                    </div>
                  </Col>
                </Row>
                
              </div>
            )}            
            {step === 2 && <ReceiverSenderDetails />}

            {/* Buttons Row */}
            <Row className="mt-3">
              <Col xs={6} className="text-center">
                <button className="btn btn-primary" onClick={handleSaveSize}>
                  Save
                </button>
              </Col>
              <Col xs={6} className="text-right">
                <button className="btn btn-primary" onClick={handleNextStep}>
                  Next
                </button>
                {/* {step < 3 ? (
                  <Link to={`/receiverSenderDetails`} className="arrow-link">
                    <div className="arrow-text" onClick={handleNextStep}>
                      Next <ArrowRightCircle size={24} />
                    </div>
                  </Link>
                ) : null} */}
              </Col>
            </Row>
            {/* Navigation Arrows with Styled Text */}
            <Row className="">
              <Col xs={6}>
                {step > 1 && (
                  <Link to={`/${step - 1}`} className="arrow-link">
                    <ArrowLeftCircle size={24} />
                  </Link>
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SendNewParcel;
