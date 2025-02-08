import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./context/Context.jsx";
import { FilterContextProvider } from "./context/Filter_Context.jsx";
import { CartProvider } from "./components/pages/cart/CartContext.jsx";
import { AuthProvider } from "./components/authentication/context/authContext.jsx"; // import AuthContextProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {" "}
      {/* Add AuthContextProvider here */}
      <AppProvider>
        <FilterContextProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterContextProvider>
      </AppProvider>
    </AuthProvider>
  </StrictMode>
);
