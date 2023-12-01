import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';

interface ParcelSizeProps {
  onChange: (parcelSize: any) => void;
}

const ParcelSize: React.FC<ParcelSizeProps> = (props: ParcelSizeProps) => {
  const [parcelSize, setParcelSize] = useState<any>({
    parcel_depth: '',
    parcel_width: '',
    parcel_height: '',
    parcel_mass: '',
    fragileChecked: false,
    fastDeliveryChecked: false,
  });

  useEffect(() => {
    props.onChange(parcelSize);
  }, [parcelSize]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParcelSize((prevDetails:any) => ({ ...prevDetails, [name]: value }));
  };

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setParcelSize((prevDetails:any) => ({ ...prevDetails, [name]: checked }));
  };

  const [step, setStep] = useState(1);

  const goToPreviousStep = () => {
    setStep(step - 1);
  };

  const goToNextStep = () => {
    setStep(step + 1);
  };  

    return (
        <div>
          <h3 className='sizeHeading'>Please fill in here package details. Note the maximum size!</h3>
          <Table className="parcelSize">
            <tbody>
                <tr>
                    <td>
                        <span className="unit">Length (max 60cm):</span>
                        <Form.Control
                            type="number"
                            placeholder="Enter length in cm"
                            name="parcel_depth"
                            value={parcelSize.parcel_depth}
                            onChange={handleInputChange}
                        />
                     </td>
                </tr>
                <tr>
                    <td>
                        <span className="unit">Width (max 50cm):</span>
                        <Form.Control
                            type="number"
                            placeholder="Enter width in cm"
                            name="parcel_width"
                            value={parcelSize.parcel_width}
                            onChange={handleInputChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <span className="unit">Height (max 40cm):</span>
                        <Form.Control
                            type="number"
                            placeholder="Enter height in cm"
                            name="parcel_height"
                            value={parcelSize.parcel_height}
                            onChange={handleInputChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <span className="unit">Weight (max 10kg):</span>
                        <Form.Control
                            type="number"
                            placeholder="Enter weight in kg"
                            name="parcel_mass"
                            value={parcelSize.parcel_mass}
                            onChange={handleInputChange}
                        />
                    </td>
                </tr>
            </tbody>
          </Table>
        {/* Additional Services */}
        <Row className="mt-3">
        <Col xs={12}>
          <h4>Check for additional services</h4>
          <div className="custom-checkbox">
            <Form.Check
              type="checkbox"
              label={`Fragile - Extra fee 10 €`}
              name="fragileChecked"
              checked={parcelSize.fragileChecked}
              onChange={handleCheckedChange}
            />
          </div>
          <div className="custom-checkbox">
            <Form.Check
              type="checkbox"
              label={`Fast delivery - Extra fee 7,9 €`}
              name="fastDeliveryChecked"
              checked={parcelSize.fastDeliveryChecked}
              onChange={(handleCheckedChange)}
            />
          </div>
        </Col>
      </Row>
      </div>
    );
}

export default ParcelSize;

