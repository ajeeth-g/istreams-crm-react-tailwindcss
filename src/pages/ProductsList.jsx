import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash, Search, SquarePen, PlusCircle  } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useLocation  } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const newItem = location.state?.newItem || null;
  const [items, setItems] = useState([]);

  const handleCreateService = () => {
    navigate("/create-service");
  };
  
  const handleCreateProduct = () => {
    navigate("/create-product");
  };

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedServices = JSON.parse(localStorage.getItem("services")) || [];

    const combinedItems = [...storedProducts, ...storedServices];
    
    setItems(combinedItems);
    setProducts([...storedProducts, ...storedServices]);
  }, []);

  // Listen for changes in localStorage to update the list dynamically
  useEffect(() => {
    const handleStorageUpdate = () => {
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const storedServices = JSON.parse(localStorage.getItem("services")) || [];
      setItems([...storedProducts, ...storedServices]);
    };
  
    window.addEventListener("storage", handleStorageUpdate);
    return () => window.removeEventListener("storage", handleStorageUpdate);
  }, []);
  


  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("products")) || [];
    if (newItem) {
      setItems([...storedItems, newItem]); // Add the new item dynamically
    } else {
      setItems(storedItems);
    }
  }, [newItem]);

  useEffect(() => {
    const fetchItems = () => {
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const storedServices = JSON.parse(localStorage.getItem("services")) || [];
  
      console.log("Fetching Products:", storedProducts);
      console.log("Fetching Services:", storedServices);
  
      const allItems = [...storedProducts, ...storedServices];
      setItems(allItems);
      setFilteredProducts(allItems);
    };
  
    fetchItems();
  
    // Listen for localStorage changes
    window.addEventListener("storage", fetchItems);
    return () => window.removeEventListener("storage", fetchItems);
  }, []);
  
  
  
  

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];  
    setProducts(storedProducts);
    setFilteredProducts(storedProducts);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(
      (product) =>
        product.itemName.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const handleEdit = (product) => {
    navigate("/create-product", { state: { product } });
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    toast.success("Product deleted successfully!");
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCreateProduct}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Create Product</span>
          </button>
          <button
            onClick={handleCreateService}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Create Service</span>
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Products"
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>
  
      {filteredProducts.length === 0 ? (
        <p className="text-gray-400 text-center">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Item Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Supplier Ref</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProducts.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.itemCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    {item.image && (
                      <img
                        className="h-10 w-10 rounded-full object-cover mr-4"
                        src={item.image}
                        alt={item.itemName}
                      />
                    )}
                    <span className="text-sm font-medium text-white">{item.itemName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {item.type || (item.isService ? "Service" : "Product")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₹{item.salesPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.supplierRef}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(item)} className="text-blue-400 hover:text-blue-300 mr-2">
                      <SquarePen className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(index)} className="text-red-400 hover:text-red-300">
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
  
};

export default ProductsList;
