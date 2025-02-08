import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  Card,
  FormControl,
  InputGroup,
  Carousel,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar, FaCheck } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useCart } from "../cart/CartContext";
import RecommendedProducts from "../recommendedProducts/RecommendedProducts";

function SingleProduct() {
  const { id } = useParams();
  const cleanedId = id.replace(":", "");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const API = `http://localhost:5000/api/products/${cleanedId}`;
  const [priceUpdate, setPriceUpdate] = useState(0);
  const navigate = useNavigate();
  const { cartState, cartDispatch } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(API);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch product data", err);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [cleanedId]);

  useEffect(() => {
    if (product) {
      setPriceUpdate(product.price * quantity); // Update price based on quantity
    }
  }, [quantity, product]); // Triggered when quantity or product changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const {
    sku,
    name,
    colors = [],
    category,
    company,
    description,
    price,
    stars,
    reviews,
    shipping,
    stock,
    image = [],
  } = product;

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-warning" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-warning" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} className="text-warning" />
        ))}
      </>
    );
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) =>
      prevQuantity < stock ? prevQuantity + 1 : prevQuantity
    );
  };

  const decreaseQuantity = () =>
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));

  const handleAddToCart = (
    skuData,
    imageData,
    nameData,
    quantityData,
    selectedColorData,
    unitPrice,
    originalPrice
  ) => {
    const existingItem = cartState.cartItems.find(
      (cartItem) =>
        cartItem.skuData === skuData &&
        cartItem.selectedColorData === selectedColorData
    );

    if (existingItem) {
      // Update the existing item's quantity and total price
      const updatedCart = cartState.cartItems.map((cartItem) => {
        if (
          cartItem.skuData === skuData &&
          cartItem.selectedColorData === selectedColorData
        ) {
          const updatedQuantity = cartItem.quantityData + quantityData;
          return {
            ...cartItem,
            quantityData: updatedQuantity,
            priceData: unitPrice * updatedQuantity, // Update total price
          };
        }
        return cartItem;
      });
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      cartDispatch({ type: "UPDATE_CART", payload: updatedCart });
    } else {
      // Add new item to the cart
      const cartItem = {
        skuData,
        imageData,
        nameData,
        quantityData,
        selectedColorData,
        priceData: unitPrice, // Calculate total price
        orgPrice: Number(originalPrice),
      };
      cartDispatch({ type: "ADD_TO_CART", payload: cartItem });
    }

    navigate("/cart");
  };

  return (
    <Container className="my-5">
      <Row>
        {/* Product Image Section */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Carousel>
              {image.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={img}
                    alt={`Slide ${index + 1}`}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Card>
        </Col>

        {/* Product Details Section */}
        <Col md={6}>
          <h2>{name}</h2>
          <p className="text-muted">
            Category: <Badge bg="secondary">{category}</Badge>
          </p>
          <p className="text-muted">
            Company: <Badge bg="info">{company}</Badge>
          </p>
          <p>
            <strong>Price:</strong>
            <span className="text-success fs-4">${priceUpdate}</span>
          </p>

          {/* Rating and Reviews */}
          <div className="my-3">
            <strong>Rating: </strong>
            {renderStars(stars)}
            <span className="ms-2">({reviews} reviews)</span>
          </div>

          {/* Colors */}
          <Row className="mt-4">
            {colors.map((color, index) => (
              <Col xs={1} key={index} className="mb-3">
                <Card
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: color,
                    cursor: "pointer",
                    border:
                      selectedColor === color
                        ? "3px solid black"
                        : "1px solid #ddd",
                    borderRadius: "50%",
                  }}
                  onClick={() => handleColorSelect(color)}
                >
                  {selectedColor === color && (
                    <FaCheck
                      style={{
                        color: "white",
                        fontSize: "0.9rem",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  )}
                </Card>
              </Col>
            ))}
          </Row>

          {/*** quantity select ****/}

          <Row className="mt-2">
            <Col xs="auto">
              <InputGroup>
                <Button variant="outline-secondary" onClick={decreaseQuantity}>
                  <AiOutlineMinus />
                </Button>
                <FormControl
                  value={quantity}
                  readOnly
                  style={{ maxWidth: "50px", textAlign: "center" }}
                />
                <Button variant="outline-secondary" onClick={increaseQuantity}>
                  <AiOutlinePlus />
                </Button>
              </InputGroup>
            </Col>
          </Row>

          {selectedColor && (
            <Row className="justify-content-center mt-4">
              <Col xs={1}>
                <Card.Text>
                  Selected Color:{" "}
                  <span style={{ color: selectedColor }}>{selectedColor}</span>
                </Card.Text>
                <Card.Text>Quantity: {quantity}</Card.Text>
              </Col>
            </Row>
          )}
          {/* Description */}
          <p className="mt-4">{description}</p>

          {/* Shipping and Stock */}
          <p className="text-muted">
            {shipping ? "Free Shipping Available" : "Shipping Charges Apply"}
          </p>
          <p className="text-muted">
            <strong>Stock: </strong>
            {stock > 0 ? `${stock} available` : "Out of Stock"}
          </p>

          <hr />

          {/* Add to Cart Button */}
          {stock > 0 && (
            <Button
              variant="primary"
              size="lg"
              disabled={stock === 0}
              onClick={() =>
                handleAddToCart(
                  sku,
                  image,
                  name,
                  quantity,
                  selectedColor,
                  priceUpdate,
                  price
                )
              }
            >
              {stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          )}
        </Col>
      </Row>
      <RecommendedProducts sku={sku} />
    </Container>
  );
}

export default SingleProduct;
