import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const SendParcelConfirm = (props: any) => {
    const { parcelData} = props;

return (
    <div>
        <h3>Please confirm your order</h3>
        {JSON.stringify(parcelData)}
        <Row>
            <Col xs={6}>
                <div className="receiver">
                    <h4>Receiver</h4>
                        <p style={{ fontWeight: 'bold' }}>Name: {parcelData.reciever_name}</p>
                        <p style={{ fontWeight: 'bold' }}>Street address: {parcelData.reciever_street_address}</p>
                        <p style={{ fontWeight: 'bold' }}>Postal code: {parcelData.reciever_postal_code}</p>
                        <p style={{ fontWeight: 'bold' }}>City: {parcelData.reciever_city}</p>
                        <p style={{ fontWeight: 'bold' }}>Telephone: {parcelData.reciever_telephone}</p>
                        <p style={{ fontWeight: 'bold' }}>Email: {parcelData.receiver_email}</p>
                        <p style={{ fontWeight: 'bold' }}>Pick-up location: {parcelData.desired_pickup_locker}</p>
                        <h5 style={{ fontWeight: 'bold' }}>Estimated time of delivery: TBD</h5>
                        <h5 style={{ fontWeight: 'bold' }}>Costs of the delivery: TBD</h5>
                </div>
            </Col>
            <Col xs={6}>
                <div className="sender">
                    <h4 style={{ fontWeight: 'bold' }}>Sender's details</h4>
                        <p style={{ fontWeight: 'bold' }}>Name: {parcelData.sender_name}</p>
                        <p style={{ fontWeight: 'bold' }}>Street address: {parcelData.sender_street_address}</p>
                        <p style={{ fontWeight: 'bold' }}>Postal code: {parcelData.sender_postal_code}</p>
                        <p style={{ fontWeight: 'bold' }}>City: {parcelData.sender_city}</p>
                        <p style={{ fontWeight: 'bold' }}>Telephone: {parcelData.sender_telephone}</p>
                        <p style={{ fontWeight: 'bold' }}>Email: {parcelData.sender_email}</p>
                        <p style={{ fontWeight: 'bold' }}>Drop-off location: {parcelData.desired_dropoff_locker}</p>
                </div>
            </Col>  
        </Row>
    </div>
    );
};


export default SendParcelConfirm;