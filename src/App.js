import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainers";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";



function App() {


  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return <main>
    {
      isOpen &&
      <Modal />
    }
    <Navbar />
    <CartContainer />
  </main>;
}
export default App;
