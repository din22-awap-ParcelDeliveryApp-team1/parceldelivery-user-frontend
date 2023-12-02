import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { faInstagram, faFacebookSquare, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer= () => {
    return (
        <footer className="footer bg-body-tertiary mt-auto py-3">
          <Container>
            <Row className="justify-content-between">
              <Col xs={12} md={4}>
                <div className="footer-brand">
                  <div className="logo">Logo</div>
                  <div className="company-name">name of company here</div>
                  <div className="terms">
                    <a href="/terms-and-conditions">Terms and Conditions</a>
                  </div>
                  <div className="copyright">
                    Copyright 2023 All rights reserved
                  </div>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="footer-contact">
                  <h5>CONTACT US</h5>
                  <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Street, City, postal code</p>
                  <p><FontAwesomeIcon icon={faPhone} /> 000-0000 00</p>
                  <p><FontAwesomeIcon icon={faEnvelope} /> hello@woow.com</p>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="footer-social">
                  <h5>SOCIAL NETWORK</h5>
                  <div className="social-icons">
                    <a href="https://www.facebook.com" className="facebook">
                      <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
                    </a>
                    <a href="https://www.youtube.com" className="youtube">
                      <FontAwesomeIcon icon={faYoutube} size="2x" />
                    </a>
                    <a href="https://www.twitter.com" className="twitter">
                      <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                    <a href="https://www.instagram.com" className="instagram">
                      <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      );
    }

    export default Footer;