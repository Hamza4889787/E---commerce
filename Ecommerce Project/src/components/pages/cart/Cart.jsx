import { useCart } from "./CartContext";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartState, cartDispatch } = useCart();
  const navigate = useNavigate();

  const handleQuantityData = (action, sku) => {
    // Create a new array by mapping over the cart items
    const updatedCart = cartState.cartItems.map((item) => {
      if (item.skuData === sku) {
        // Extract the original price and current quantity
        const currentPrice = Number(item.orgPrice);
        const newPrice = Number(item.priceData);
        const currentQuantity = Number(item.quantityData);

        // Ensure the current price and quantity are valid numbers
        if (isNaN(currentPrice) || isNaN(currentQuantity)) {
          console.error("Invalid price or quantity data:", item);
          return item; // Skip update for invalid data
        }

        // Calculate the new quantity
        const newQuantity =
          action === "add" ? currentQuantity + 1 : currentQuantity - 1;

        // Prevent quantity from going below 1
        const finalQuantity = newQuantity < 1 ? 1 : newQuantity;

        // Increase the original price when adding
        const updatedPrice =
          action === "add" ? newPrice + currentPrice : currentPrice;

        // Return the updated item with new quantity and price
        return {
          ...item,
          quantityData: finalQuantity,
          // Update the original price
          priceData: updatedPrice, // Recalculate the total price
        };
      }
      return item;
    });

    // Update the state and local storage
    cartDispatch({ type: "UPDATE_CART", payload: updatedCart });
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (skuToDelete, colorToDelete) => {
    const updatedCart = cartState.cartItems.filter(
      (item) =>
        !(
          item.skuData === skuToDelete &&
          item.selectedColorData === colorToDelete
        )
    );

    // Save updated cart to localStorage and update state
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    cartDispatch({ type: "UPDATE_CART", payload: updatedCart });
  };
  // handle check out

  const handleCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Shopping Cart</h2>
      <div>
        <Button
          variant="primary"
          size="sm"
          className="my-3"
          onClick={() => handleCheckOut()}
        >
          Buy Now
        </Button>
      </div>
      {cartState.cartItems.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          Your cart is empty. Start shopping now!
        </div>
      ) : (
        <Table striped bordered hover responsive className="cart-table">
          <thead className="table-primary">
            <tr className="text-center">
              <th>Image</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Color</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartState.cartItems.map((item, index) => (
              <tr key={index} className="align-middle text-center">
                <td>
                  <img
                    src={item.imageData}
                    className="img-fluid rounded"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{item.nameData}</td>
                <td>{item.skuData}</td>
                <td>
                  <button
                    onClick={() => handleQuantityData("add", item.skuData)}
                    className="mx-3"
                  >
                    +
                  </button>
                  {item.quantityData}
                  <button
                    className="mx-3"
                    onClick={() => handleQuantityData("minus", item.skuData)}
                  >
                    -
                  </button>
                </td>
                <td>
                  <span
                    className="rounded-circle d-inline-block"
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: item.selectedColorData,
                      border: "1px solid #ddd",
                    }}
                  ></span>
                </td>
                <td>${item.priceData}</td>

                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      handleRemoveItem(item.skuData, item.selectedColorData)
                    }
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Cart;
