import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { faInstagram, faFacebookSquare, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../images/logo.png';

const Footer= () => {
    return (
        <footer className="footer bg-body-tertiary mt-50 py-3">
          <Container>
            <Row className="justify-content-between">
              <Col xs={12} md={4}>
                <div className="footer-brand">
                  <div className="logo"><img className="navLogo" src={logo} alt="Logo" /></div>
                  {/* <div className="company-name"> <strong>DeliverMe!</strong></div> */}
                  <div className="terms">
                    <a style={{color:"#035f68"}} href="/terms-and-conditions">Terms and Conditions</a>
                  </div>
                  <div> className="copyright"
                    Copyright 2023 All rights reserved
                  </div>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="footer-contact">
                  <h5>CONTACT US</h5>
                  <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Yliopistokatu 9, 90570 Oulu</p>
                  <p><FontAwesomeIcon icon={faPhone} /> +358 123456789</p>
                  <p><FontAwesomeIcon icon={faEnvelope} /> deliverme@gmail.com</p>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="footer-social">
                  <h5>SOCIAL NETWORK</h5>
                  <div className="social-icons">
                    <a href="https://www.facebook.com" className="facebook">
                      <FontAwesomeIcon icon={faFacebookSquare} size="2x" style={{color:"#035f68"}}/>
                    </a>
                    <a href="https://www.youtube.com" className="youtube">
                      <FontAwesomeIcon icon={faYoutube} size="2x" style={{color:"#035f68"}}/>
                    </a>
                    <a href="https://www.twitter.com" className="twitter">
                      <FontAwesomeIcon icon={faTwitter} size="2x" style={{color:"#035f68"}}/>
                    </a>
                    <a href="https://www.instagram.com" className="instagram">
                      <FontAwesomeIcon icon={faInstagram} size="2x" style={{color:"#035f68"}}/>
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