import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={footerStyles}>
      <Container>
        <Row>
          {/* Quick Links */}
          <Col md={3} sm={6} style={colStyles}>
            <h5 style={headingStyles}>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" style={linkStyles}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" style={linkStyles}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" style={linkStyles}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/products" style={linkStyles}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/login" style={linkStyles}>
                  Login
                </Link>
              </li>
            </ul>
          </Col>

          {/* Search Bar */}
          <Col md={6} sm={12} style={colStyles}>
            <h5 style={headingStyles}>Search Our Store</h5>
            <Form inline className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search for products"
                className="me-2"
                style={inputStyles}
              />
              <Button variant="light" style={buttonStyles}>
                Search
              </Button>
            </Form>
          </Col>

          {/* About Us */}
          <Col md={3} sm={6} style={colStyles}>
            <h5 style={headingStyles}>About Us</h5>
            <p style={paragraphStyles}>
              Welcome to <strong>Hamza Store</strong>, your ultimate shopping
              destination. We offer a wide range of products to suit your needs.
            </p>

            {/* Social Media Icons */}
            <div style={socialStyles}>
              <FaFacebook size={28} style={iconStyles} />
              <FaInstagram size={28} style={iconStyles} />
              <FaTwitter size={28} style={iconStyles} />
            </div>
          </Col>
        </Row>

        <hr style={hrStyles} />

        <Row className="text-center">
          <Col>
            <p className="mb-0" style={copyrightStyles}>
              &copy; {currentYear} Hamza Store. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

const footerStyles = {
  backgroundColor: "#000", // Black background for the footer
  color: "#fff", // White text for contrast
  padding: "40px 0",
  borderTop: "1px solid #fff",
};

const colStyles = {
  marginBottom: "20px",
};

const headingStyles = {
  color: "#fff", // White color for headings
  marginBottom: "20px",
};

const linkStyles = {
  color: "#fff",
  textDecoration: "none",
  display: "block",
  marginBottom: "10px",
  fontWeight: "bold",
  transition: "color 0.3s ease",
};

const inputStyles = {
  flex: 1,
  borderRadius: "20px",
  padding: "10px",
  marginRight: "10px",
  backgroundColor: "#333", // Darker input background
  color: "#fff", // White text
  border: "none",
};

const buttonStyles = {
  backgroundColor: "#fff",
  color: "#000",
  borderColor: "#fff",
  borderRadius: "20px",
  padding: "10px 20px",
  fontWeight: "bold",
};

const paragraphStyles = {
  fontSize: "14px",
  lineHeight: "1.6",
};

const socialStyles = {
  display: "flex",
  gap: "15px",
  marginTop: "20px",
};

const iconStyles = {
  color: "#fff", // White icons to match the theme
  cursor: "pointer",
  transition: "color 0.3s ease",
};

const hrStyles = {
  borderColor: "rgba(255, 255, 255, 0.2)",
};

const copyrightStyles = {
  color: "rgba(255, 255, 255, 0.8)",
};
