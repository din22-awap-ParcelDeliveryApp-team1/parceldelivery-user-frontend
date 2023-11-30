import { Row, Col, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SendParcelConfirm = (props: any) => {
    const { parcelData} = props;

return (
    <div>
        <h3>Please confirm your order</h3>
        <Row>
            <Col xs={6}>
                <div className="receiver">
                    <h4>Receiver</h4>
                        <p> <strong>Name:</strong> {parcelData.reciever_name}</p>
                        <p> <strong>Street address:</strong> {parcelData.reciever_street_address}</p>
                        <p> <strong>Postal code:</strong> {parcelData.reciever_postal_code}</p>
                        <p> <strong>City:</strong> {parcelData.reciever_city}</p>
                        <p> <strong>Telephone:</strong> {parcelData.reciever_telephone}</p>
                        <p> <strong>Email:</strong> {parcelData.receiver_email}</p>
                        <p> <strong>Pick-up location:</strong> {parcelData.desired_pickup_locker}</p>
                        <p><strong>Estimated time of delivery:</strong>{' '}
                            {parcelData.parcel_readyforpickup_date.toLocaleDateString()}
                        </p>
                        <p> <strong>Costs of the delivery: 7,9 € </strong></p>
                </div>
            </Col>
            <Col xs={6}>
                <div className="sender">
                    <h4>Sender's details</h4>
                        <p> <strong>Name:</strong> {parcelData.sender_name}</p>
                        <p> <strong>Street address:</strong> {parcelData.sender_street_address}</p>
                        <p> <strong>Postal code:</strong> {parcelData.sender_postal_code}</p>
                        <p> <strong>City:</strong> {parcelData.sender_city}</p>
                        <p> <strong>Telephone:</strong> {parcelData.sender_telephone}</p>
                        <p> <strong>Email:</strong> {parcelData.sender_email}</p>
                        <p> <strong>Drop-off location:</strong> {parcelData.desired_dropoff_locker}</p>
                </div>
            </Col>  
        </Row>
    </div>
    );
};


export default SendParcelConfirm;