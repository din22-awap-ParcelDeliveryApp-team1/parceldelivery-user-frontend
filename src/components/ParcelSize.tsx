import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';


const ParcelSize: React.FC = () => {
    const [length, setLength] = useState<number | ''>('');
    const [width, setWidth] = useState<number | ''>('');
    const [height, setHeight] = useState<number | ''>('');
    const [weight, setWeight] = useState<number | ''>('');

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setValue: React.Dispatch<React.SetStateAction<number | ''>>
      ) => {
        const value = event.target.value;
        setValue(value === '' ? '' : parseInt(value, 10));
      };

    return (
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
    );
}

export default ParcelSize;

