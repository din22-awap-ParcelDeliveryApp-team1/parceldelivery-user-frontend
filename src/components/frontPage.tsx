import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const FrontPage = () => {
    return (
        <Container className="home">
            <Row className="mt-10">
                <Col xs={8}>
                    <div className="home">
                        <h1>Front Page before logging in</h1>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default FrontPage;