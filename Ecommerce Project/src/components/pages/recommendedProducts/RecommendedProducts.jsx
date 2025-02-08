import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import "./RecommendedProducts.css";

function RecommendedProducts({ sku }) {
  const [RPproducts, setRPproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const API = `http://localhost:5000/api/products/recommend/${sku}`;
  const sliderRef = useRef(null);

  const FetchRecommendation = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setRPproducts(res.data);
      setLoading(false);
    } catch (e) {
      setError("Error fetching recommended products.");
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchRecommendation();
  }, [sku]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      sliderRef.current.style.transform = `translateX(-${
        (currentIndex - 1) * 100
      }%)`;
    }
  };

  const handleNext = () => {
    if (currentIndex < RPproducts.length - 4) {
      setCurrentIndex(currentIndex + 1);
      sliderRef.current.style.transform = `translateX(-${
        (currentIndex + 1) * 100
      }%)`;
    }
  };

  // Slicing products to show 4 at a time
  const productsToDisplay = RPproducts.slice(currentIndex, currentIndex + 4);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container my-5">
      <h1>Recommended Products</h1>
      <div className="product-slider-container">
        <div
          ref={sliderRef}
          className="product-slider"
          style={{ display: "flex", transition: "transform 0.3s ease" }}
        >
          {productsToDisplay.map((product, index) => (
            <div key={index} className="product-item">
              <Card style={{ width: "18rem", height: "300px" }}>
                <Card.Img variant="top" src={product.image[0]} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Button
          variant="primary"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Prev
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          className="ms-3"
          disabled={currentIndex >= RPproducts.length - 4}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default RecommendedProducts;
