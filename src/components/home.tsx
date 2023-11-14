
import Sidebar from "./sidebar";


import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <Container className="home">
            <Row className="mt-10">
                <Col xs={4} className="sidebar mr-7">
                    <Sidebar />
                </Col>
                <Col xs={8}>
                    <div className="home">
                        <h1>Home Page</h1>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;