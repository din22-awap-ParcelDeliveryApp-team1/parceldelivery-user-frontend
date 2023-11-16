import '../styling/sendNewParcel.css';

import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { ArrowLeftCircle, ArrowRightCircle} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import ParcelSize from './ParcelSize';
import ParcelSizeImage from './ParcelSizeImage';

const SendNewParcel: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [fragileChecked, setFragileChecked] = useState<boolean>(false);
  const [fastDeliveryChecked, setFastDeliveryChecked] = useState<boolean>(false);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <Container className="sendNewParcel">
    <Row className="mt-3">
      <Col xs={4} className="sidebar mr-2">
        <Sidebar />
      </Col>
      <Col xs={8}>
        <div className="sendNewParcel">
          <h3>Please fill in here package details. Note the maximum size!</h3>
          {step === 1 && (
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
          )}
          {/* Add more steps as needed */}

          {/* Additional Services */}
          <Row className="mt-3">
              <Col xs={12}>
                <h4>Check for additional services</h4>
                <div className="custom-checkbox">
                  <Form.Check
                    type="checkbox"
                    label={`Fragile - Extra fee 10 €`}
                    checked={fragileChecked}
                    onChange={() => setFragileChecked(!fragileChecked)}
                    id="fragile-checkbox"
                  />
                </div>
                <div className="custom-checkbox">
                  <Form.Check
                    type="checkbox"
                    label={`Fast delivery - Extra fee 7,9 €`}
                    checked={fastDeliveryChecked}
                    onChange={() => setFastDeliveryChecked(!fastDeliveryChecked)}
                    id="fast-delivery-checkbox"
                  />
                </div>
              </Col>
            </Row>

          {/* Navigation Arrows with Styled Text */}
          <Row className="mt-3">
            <Col xs={6}>
              {step > 1 && (
                <Link to={`/${step - 1}`} className="arrow-link">
                  <ArrowLeftCircle size={24} />
                </Link>
              )}
            </Col>
            <Col xs={6} className="text-right">
              {step < 3 && (
                <Link to={`/${step + 1}`} className="arrow-link">
                  <div className="arrow-text">
                    Confirm and next <ArrowRightCircle size={24} />
                  </div>
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

