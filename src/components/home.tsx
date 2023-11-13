import Sidebar from "./sidebar";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const home = () => {
    return (
        <Container>
            <Row>
                <Col xs={3}>
                    <Sidebar />
                </Col>
                <Col xs={9}>
                    <div className="home">
                        <h1>Home Page</h1>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default home;