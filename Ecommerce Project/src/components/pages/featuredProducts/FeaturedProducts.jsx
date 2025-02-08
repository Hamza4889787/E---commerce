import { useProductContext } from "../../../context/Context";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function FeaturedProducts() {
  const cardStyle = {
    transition: "transform 0.2s",
    borderRadius: "0.5rem",
  };

  const cardHoverStyle = {
    transform: "scale(1.05)",
  };

  const titleStyle = {
    color: "#343a40",
    fontWeight: "bold",
  };

  const descriptionStyle = {
    color: "#6c757d",
    fontSize: "0.9rem",
  };

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#343a40",
    border: "none",
  };

  const { isLoading, featureProducts } = useProductContext();
  if (isLoading) {
    return <div>...... Loading</div>;
  }
  const truncateText = (text) => {
    if (text.length > 100) {
      text = text.slice(0, 200) + "...";
    }
    return text;
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Featured Products</h2>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "70px",
        }}
      >
        {featureProducts.map((card, index) => (
          <Col key={index} md={3} className="mb-4">
            <Card
              className="h-100 shadow-lg border-0"
              style={cardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = cardHoverStyle.transform)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Card.Img
                variant="top"
                src={card.image}
                style={{ borderRadius: "0.5rem" }}
              />
              <Card.Body>
                <Card.Title style={titleStyle}>{card.name}</Card.Title>
                <Card.Text style={descriptionStyle}>
                  {truncateText(card.description)}
                </Card.Text>
                <Link to={`single-product/:${card.id}`}>
                  <Button style={buttonStyle}>View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FeaturedProducts;
