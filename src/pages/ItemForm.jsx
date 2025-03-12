import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Upload, Loader } from "lucide-react";

const productCategories = ["electronics", "fashion", "grocery", "furniture"];
const serviceCategories = ["standard", "professional", "enterprise", "ultimate"];

const ItemForm = () => {
  const [formType, setFormType] = useState("product");
  const isProduct = formType === "product";
  const navigate = useNavigate();
  const location = useLocation();
  const editingItem = location.state?.product || null;

  const isServiceForm = location.pathname.includes("service");


  const isEditingService = editingItem && editingItem.category === "Service";

  const [isService, setIsService] = useState(isEditingService || isServiceForm);

  const [newItem, setNewItem] = useState({
    itemCode: "",
    itemName: "",
    itemType: "",
    supplierRef: "",
    salesPrice: "",
    marginPercentage: "",
    category: isService ? serviceCategories[0] : productCategories[0],
    image: "",
    quantity: "",
    features: "",
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageKey = isService ? "services" : "products";
    const storedItems = JSON.parse(localStorage.getItem(storageKey)) || [];
    setItems(storedItems);
    console.log("Stored Products:", JSON.parse(localStorage.getItem("products")));
    console.log("Stored Services:", JSON.parse(localStorage.getItem("services")));
  }, [isService, location.pathname]); // Ensure it updates on path change
  

  useEffect(() => {
    setIsService(isEditingService || isServiceForm);
  }, [isEditingService, isServiceForm]);

  useEffect(() => {
    if (editingItem) {
      setNewItem(editingItem);
      setIsService(editingItem.category && serviceCategories.includes(editingItem.category));
    }
  }, [editingItem]);
  
  

  useEffect(() => {
    setNewItem((prev) => ({
      ...prev,
      category: isService ? serviceCategories[0] : productCategories[0],
    }));
  }, [isService]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: name === "category" ? value : value, // Ensure category is properly updated
    }));
  };
  

  useEffect(() => {
    if (location.pathname === "/create-service") {
      setFormType("service");
    } else if (location.pathname === "/create-product") {
      setFormType("product");
    }
  }, [location.pathname]);
  

  useEffect(() => {
    const storageKey = isService ? "services" : "products";
    const storedItems = JSON.parse(localStorage.getItem(storageKey)) || [];
    setItems(storedItems);
  }, [isService]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!newItem.category) {
      toast.error("Please select a category before submitting.");
      return;
    }
  
    setLoading(true);
  
    let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    let storedServices = JSON.parse(localStorage.getItem("services")) || [];
              
    if (isService) {
      if (editingItem) {
        storedServices = storedServices.map((item) =>
          item.itemCode === editingItem.itemCode ? newItem : item
        );
        toast.success("Service updated successfully!");
      } else {
        storedServices.push(newItem);
        toast.success("Service added successfully!");
      }
      localStorage.setItem("services", JSON.stringify(storedServices));
    } else {
      if (editingItem) {
        storedProducts = storedProducts.map((item) =>
          item.itemCode === editingItem.itemCode ? newItem : item
        );
        toast.success("Product updated successfully!");
      } else {
        storedProducts.push(newItem);
        toast.success("Product added successfully!");
      }
      localStorage.setItem("products", JSON.stringify(storedProducts));
    }
  
    // Combine both products & services into a single list
    const combinedItems = [...storedProducts, ...storedServices];
  
    // Save to localStorage & trigger update
    window.dispatchEvent(new Event("storage"));
  
    setLoading(false);
  
    console.log("Stored Products:", storedProducts);
    console.log("Stored Services:", storedServices);
    console.log("Combined List:", combinedItems);
  
    // Reset form
    setNewItem({
      itemCode: "",
      itemName: "",
      itemType: "",
      supplierRef: "",
      salesPrice: "",
      marginPercentage: "",
      category: isService ? serviceCategories[0] : productCategories[0],
      image: "",
      quantity: "",
      features: "",
    });
  
    setItems(combinedItems); // Set combined items to state
  
    // Navigate to ProductsList with both products & services
    navigate("/productsList", { 
      state: { 
        items: [...storedProducts, ...storedServices] //  Pass both lists
      }, 
      replace: true 
    });
  };
  
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setNewItem({ ...newItem, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-300">
          {editingItem  ? `Edit ${isProduct ? "Product" : "Service"}` : `Create New ${isProduct ? "Product" : "Service"}`}
        </h2>
        <button
          onClick={() => {
          const newFormType = isProduct ? "service" : "product";
          navigate(newFormType === "service" ? "/create-service" : "/create-product");
          }}
        >
          Switch to {isProduct ? "Service" : "Product"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Container: Form (70%) */}
        <div className={`bg-gray-900 p-6 rounded-lg shadow-md ${isProduct ? "w-full md:w-[70%]" : "w-full"}`}>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Row 1: Item Code & Item Name */}
            <div className="flex flex-wrap md:flex-nowrap gap-4">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-300" htmlFor="itemCode">Item Code</label>
              <input
                  type="text"
                  id="itemCode"
                  name="itemCode"
                  value={newItem.itemCode}
                  onChange={handleChange}
                  // disabled={!!productToEdit}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-400"
                  required
                />
            </div>

            <div className="w-full md:w-1/2">
            <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="itemName"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={newItem.itemName}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
            </div>
            </div>

            {/* Row 2: Product & Supplier Ref */}
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <div className="w-full md:w-1/2">
                <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="itemType"
                >
                  Product / Service
                </label>
                <input
                  type="text"
                  id="itemType"
                  name="itemType"
                  value={newItem.itemType}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="w-full md:w-1/2">
                <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="supplierRef"
                >
                  Supplier Ref
                </label>
                <input
                  type="text"
                  id="supplierRef"
                  name="supplierRef"
                  value={newItem.supplierRef}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Row 3: Sales Price & Margin */}
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <div className="w-full md:w-1/2">
                <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="salesPrice"
                >
                  Sales Price
                </label>
                <input
                  type="text"
                  id="salesPrice"
                  name="salesPrice"
                  value={newItem.salesPrice}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="w-full md:w-1/2">
                <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="marginPercentage"
                >
                  Margin %
                </label>
                <input
                  type="text"
                  id="marginPercentage"
                  name="marginPercentage"
                  value={newItem.marginPercentage}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Row:4 Category & Quantity */}
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <div className="w-full md:">
                <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="category"
                >
                  Category
                </label>  
                <select
                  id="category"
                  name="category"
                  value={newItem.category}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {(isService ? serviceCategories : productCategories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="quantity"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  
                />
              </div>
            </div>

            {/* Features */}
            <div className="w-full">
              <label
                htmlFor="features"
                className="block text-sm font-medium text-gray-300"
              >
                Features
              </label>
              <textarea
                id="features"
                name="features"
                value={newItem.features}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md flex items-center justify-center"
              
            >
               {editingItem  ? `Update ${isProduct ? "Product" : "Service"}` : `Create ${isProduct ? "Product" : "Service"}`}
               {loading && <Loader className="ml-2 h-5 w-5 animate-spin" />}
            </button>
          </form>
        </div>

        {/* Right Container: Image Upload (30%) */}
        {isProduct && (
        <div className="bg-gray-900 p-6 rounded-lg w-full md:w-[30%] shadow-md flex flex-col items-center justify-end">
          {newItem.image && (
            <img
              src={newItem.image}
              alt="Uploaded Preview"
              className="w-52 h-80 rounded-md object-cover border border-gray-600 mb-3"
            />
          )}

          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
        </div>
        )}
      </div>
    </motion.div>
  );
};

export default ItemForm;
