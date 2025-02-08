import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function NotFound() {
  return (
    <Container fluid style={containerStyles}>
      <div style={contentStyles}>
        <h1 style={headingStyles}>404</h1>
        <h2 style={subheadingStyles}>Page Not Found</h2>
        <p style={textStyles}>
          Oops! The page youre looking for doesnt exist. It might have been
          removed or you may have mistyped the URL.
        </p>
        <Button as={Link} to="/" style={buttonStyles}>
          Go Home
        </Button>
      </div>
    </Container>
  );
}

export default NotFound;

const containerStyles = {
  height: "100vh", // Full viewport height
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#000", // Black background
  color: "#fff", // White text
};

const contentStyles = {
  textAlign: "center",
};

const headingStyles = {
  fontSize: "10rem", // Big 404 text
  margin: 0,
  fontWeight: "bold",
};

const subheadingStyles = {
  fontSize: "2rem",
  marginBottom: "20px",
};

const textStyles = {
  fontSize: "1.2rem",
  marginBottom: "30px",
  maxWidth: "600px", // Limiting text width
};

const buttonStyles = {
  backgroundColor: "#fff", // White button
  color: "#000", // Black text for contrast
  borderRadius: "30px",
  padding: "10px 30px",
  fontSize: "1rem",
  fontWeight: "bold",
  border: "none",
};
