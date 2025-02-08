import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Layout from "./components/header/navbar/Layout";
import About from "./components/pages/about/About";
import Contact from "./components/pages/contact/Contact";
import SingleProduct from "./components/pages/single-product/SingleProduct";
import Cart from "./components/pages/cart/Cart";
import Login from "./components/authentication/login/Login";
import NoPage from "./components/pages/no-page/NoPage";
import "./App.css";
import ProductList from "./components/productList/ProductList";
import CheckOut from "./components/pages/cart/CheckOut";
import Register from "./components/authentication/register/Register";
import Protected from "./components/authentication/login/Protected";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="products" element={<ProductList />} />
            <Route path="single-product/:id" element={<SingleProduct />} />
            <Route
              path="/protected"
              element={<Protected Component={ProductList} />}
            />

            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/protected" element={<Protected />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
