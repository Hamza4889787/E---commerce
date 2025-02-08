import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaCartPlus } from "react-icons/fa";
import { Outlet, Link, Navigate } from "react-router-dom";
import CartCount from "../../pages/cart/CartCount";
import { useAuth } from "../../authentication/context/AuthContext";

function Layout() {
  const { token, logout } = useAuth();

  const handlelogout = () => {
    logout();
    Navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Hamza</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center d-flex">
              <Nav.Link as={Link} className="me-5 px-2" to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} className="me-5 px-2" to="about">
                About
              </Nav.Link>
              <Nav.Link as={Link} className="me-5 px-2" to="contact">
                Contact
              </Nav.Link>
              <Nav.Link as={Link} className="me-5 px-2" to="products">
                Products
              </Nav.Link>
              {!token ? (
                <Nav.Link as={Link} className="me-5 px-2 " to="login">
                  Login
                </Nav.Link>
              ) : (
                <button
                  className="bg-secondary text-white me-5 px-2 px-2 d-flex justify-content-center border"
                  onClick={handlelogout}
                >
                  Logout
                </button>
              )}
              <Nav.Link
                as={Link}
                className="bg-secondary text-white me-5 px-2 px-2 d-flex justify-content-center"
                style={{ width: "100px" }}
                to="register"
              >
                Register
              </Nav.Link>
              <Nav.Link
                as={Link}
                className="me-5 px-2 text-white"
                style={{ fontSize: "25px" }}
                to="cart"
              >
                <FaCartPlus />

                <span
                  className="position-relative top-0 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "13px" }}
                >
                  <CartCount />
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
}

export default Layout;
