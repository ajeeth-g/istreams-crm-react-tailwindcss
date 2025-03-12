import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    toast.success("Payment successful!");
    localStorage.removeItem("cart");
    navigate("/order-confirmation", { state: { cart, totalPrice, paymentMethod } });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-300 mb-4">Checkout</h2>

      <div>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between p-3 bg-gray-800 rounded-lg mb-2">
            <p className="text-white">{item.itemName}</p>
            <p className="text-emerald-400 font-bold">₹{item.salesPrice}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-white font-semibold">Total: ₹{totalPrice.toFixed(2)}</p>
      </div>

      <div className="mt-4">
        <label className="text-white font-semibold">Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="block w-full mt-2 bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded-md"
        >
          <option value="">Select a payment method</option>
          <option value="credit-card">Credit Card</option>
          <option value="debit-card">Debit Card</option>
          <option value="upi">UPI</option>
          <option value="cash-on-delivery">Cash on Delivery</option>
        </select>
      </div>

      <button
        onClick={handlePayment}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
