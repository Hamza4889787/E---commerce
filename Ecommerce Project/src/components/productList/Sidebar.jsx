import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Card,
  Col,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import { FaCheck } from "react-icons/fa";
import { useFilterContext } from "../../context/Filter_Context";

function Sidebar() {
  const API = "https://api.pujakaitem.com/api/products";
  const {
    search,
    cateroryFilter,
    handleCompany,
    colorSelection,
    updatePrice,
    price,
    minPrice,
    maxPrice,
  } = useFilterContext();

  const [products, setProducts] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];
  const [selectColor, setSelectedColor] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Failed to fetch product data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //const colorsData = products.colors.flat();
  const allColors = products.flatMap((product) => product.colors);
  const uniqueColors = [...new Set(allColors)];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    colorSelection(color);
  };

  return (
    <div>
      <Container
        className="border ms-0"
        style={{ width: "300px", height: "100vh" }}
      >
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="search"
            aria-label="Search"
            onChange={search}
          />
        </Form>

        <Container>
          {/* Show categories */}
          <h3 className="mt-5">All</h3>
          {["All", ...uniqueCategories.slice(0, 5)].map((data) => {
            return (
              <ul style={{ listStyleType: "none" }}>
                <li
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => cateroryFilter(data)}
                >
                  {data}
                </li>
              </ul>
            );
          })}
          {uniqueCategories.length > 5 && (
            <Button
              variant="link"
              style={{ padding: 0 }}
              onClick={setShowAllCategories(!showAllCategories)}
            >
              {showAllCategories ? "Show Less" : "Show More"}
            </Button>
          )}

          {/*Company*/}
          <DropdownButton id="dropdown-basic-button" title="Companies">
            {products.map((data, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleCompany(data.company)}
                >
                  {data.company}
                  {/* Change `category` to the desired property */}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>

          {/* Colors */}
          <h4 className="mt-5">Product Colors</h4>

          <div className="d-flex w-100 m">
            {uniqueColors.map((colData, index) => (
              <Col xs={1} key={index} className="ms-3 mt-3">
                <Card
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: colData,
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                  onClick={() => handleColorSelect(colData)}
                >
                  {selectColor === colData && (
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
          </div>

          {/** Price Range  **/}
          <div>
            <Form.Label>Range</Form.Label>
            <Form.Range
              min="0"
              max="1000000"
              step={10}
              value={price}
              onChange={updatePrice}
            />
          </div>
        </Container>
      </Container>
      <Container></Container>
    </div>
  );
}

export default Sidebar;
