import { RouterProvider } from "react-router-dom";
import router from "./router";
import { SupplementsProvider } from "./1-features/supplement/components/SupplementContext";
import { CartProvider } from "./1-features/cart/components/CartContext";

function App() {
  return (
    <>
      <SupplementsProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </SupplementsProvider>
    </>
  )
}

export default App;
