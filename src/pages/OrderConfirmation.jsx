import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice, paymentMethod } = location.state || { totalPrice: 0, paymentMethod: "" };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-semibold text-green-400 mb-4">Order Confirmed 🎉</h2>
      <p className="text-white">Thank you for your purchase!</p>
      <p className="text-emerald-400 font-bold mt-2">Total Paid: ₹{totalPrice.toFixed(2)}</p>
      <p className="text-gray-300">Payment Method: {paymentMethod.replace("-", " ")}</p>

      <button
        onClick={() => navigate("/category")}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderConfirmation;
