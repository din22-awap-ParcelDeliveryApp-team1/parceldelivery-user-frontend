import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';


const ParcelSize: React.FC = () => {
    const [length, setLength] = useState<number | ''>('');
    const [width, setWidth] = useState<number | ''>('');
    const [height, setHeight] = useState<number | ''>('');
    const [weight, setWeight] = useState<number | ''>('');
    const [fragileChecked, setFragileChecked] = useState<boolean>(false);
    const [fastDeliveryChecked, setFastDeliveryChecked] =
      useState<boolean>(false);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setValue: React.Dispatch<React.SetStateAction<number | ''>>
      ) => {
        event.preventDefault();
        const value = event.target.value;
        setValue(value === '' ? '' : parseInt(value, 10));
      };

    return (
        <div>
        <Table className="parcelSize">
            <tbody>
                <tr>
                    <td>
                        <span className="unit">Length (max 60cm):</span>
                        <Form.Control
                            type="number"
                            placeholder="Enter length in cm"
                            value={length}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setLength)}
                        />
                     </td>
                </tr>
                <tr>
                    <td>
                        <span className="unit">Width (max 50cm):</span>
                        <Form.Control
                            type="number"
                            placeholder="Enter width in cm"
                            value={width}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setWidth)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <span className="unit">Height (max 40cm):</span>
                        <Form.Control
                            type="number"
                            placeholder="Enter height in cm"
                            value={height}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setHeight)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <span className="unit">Weight (max 10kg):</span>
                        <Form.Control
                            type="number"
                            placeholder="Enter weight in kg"
                            value={weight}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setWeight)}
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
              onChange={() =>
                setFastDeliveryChecked(!fastDeliveryChecked)
              }
              id="fast-delivery-checkbox"
            />
          </div>
        </Col>
      </Row>
      </div>
    );
}

export default ParcelSize;

