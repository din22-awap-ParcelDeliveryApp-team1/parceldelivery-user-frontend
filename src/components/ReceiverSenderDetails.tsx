import { Col, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReceiverForm from './ReceiverForm';
import SenderForm from './SenderForm';

interface ReceiverSenderDetailsProps {
    onChange: (change: any) => unknown;
}

const ReceiverSenderDetails = (props: ReceiverSenderDetailsProps ) => {

    return (
        <Col xs={10}>
            <div className="receiverSenderDetails">
                <h3 className="margin-top-30">Please fill in here receiver and sender details</h3>
                    <h4 className="margin-top-30">Receiver's details</h4>
                        <ReceiverForm onChange={props.onChange} />
                    <h4 className="margin-top-30">Sender's details</h4>
                        <SenderForm onChange={props.onChange} />
            </div>
        </Col>
    );
};

export default ReceiverSenderDetails;

