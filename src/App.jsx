import {  Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
// import SignUpPage from "./pages/SignUpPage";
// import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Pages from "./pages/Pages";
import CustomersTable from "./pages/CustomersTable";
import Sidebar from "./components/sidebar";
import { Toaster } from "react-hot-toast";

import CategoryPage from "./pages/CategoryPage";

import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import ServicePricing from "./pages/ServicePricing";


import EnquiryPage from "./pages/EnquiryPage";

import CreateItem from "./pages/CreateItem";
import ItemsList from "./pages/ItemsList";

// import { useUserStore } from "./stores/useUserStore";
// import { useEffect } from "react";
// import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  // const {user, checkAuth, checkingAuth} = useUserStore();

  // useEffect(() => {
  //   checkAuth();
  // },[checkAuth]);

  // if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(59, 130, 246, 0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>
      <div className="flex h-screen pt-16 overflow-hidden relative z-50">
        <Navbar />
        <Sidebar />
        <div className="flex-grow p-6 overflow-y-auto h-full w-full">
          <Routes>
            {/* <Route path="/signup" element={<SignUpPage /> } />
            <Route path="/login" element={ <LoginPage />  } /> */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/pages" element={ <Pages />} />
            <Route path="/customersTable" element={ <CustomersTable />} />
            
            <Route path="/category" element={ <CategoryPage />} />
            <Route path="/products/:category" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/servicePricing" element={<ServicePricing />} />
            
            
            <Route path="/enquiryPage" element={<EnquiryPage />} />

            <Route path="/createItem" element={<CreateItem />} />
            <Route path="/itemsList" element={<ItemsList />} />

          </Routes>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
