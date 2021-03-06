import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{new Date().getFullYear()} © Talabat</Col>
            <Col md={6}>
              <div className="text-sm-right d-none d-sm-block">
                Designed & Developed by Twzeef Group
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
