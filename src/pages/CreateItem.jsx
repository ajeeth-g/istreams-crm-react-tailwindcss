import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Upload, Loader } from "lucide-react";

const productCategories = ["electronics", "fashion", "grocery", "furniture"];
const serviceCategories = ["standard", "professional", "enterprise", "ultimate"];

const CreateItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [editingItem, setEditingItem] = useState(null);

    const [newItem, setNewItem] = useState({
        itemCode: "",
        itemName: "",
        type:  "product", 
        supplierRef: "",
        salesPrice: "",
        marginPercentage: "",
        category: "",
        image: "",
        quantity: "",
        features: "",
      });

      const [loading, setLoading] = useState(false);

      useEffect(() => {
        if (location.state?.editingItem) {
          setEditingItem(location.state.editingItem);
        }
      }, [location]);

      useEffect(() => {
        if (editingItem) {
          setNewItem(editingItem);
        }
      }, [editingItem]);

      const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
      };
    

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () =>
            setNewItem({ ...newItem, image: reader.result });
          reader.readAsDataURL(file);
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
      
        let items = JSON.parse(localStorage.getItem("items")) || [];
      
        if (editingItem) {
          // Update existing item
          items = items.map((item) =>
            item.itemCode === editingItem.itemCode ? newItem : item
          );
          toast.success("Item Updated Successfully");
        } else {
          // Create new item
          items.push(newItem);
          toast.success("Item Created Successfully");
        }
      
        localStorage.setItem("items", JSON.stringify(items));
      
        setTimeout(() => {
          setLoading(false);
          setNewItem({
            itemCode: "",
            itemName: "",
            type: "",
            supplierRef: "",
            salesPrice: "",
            marginPercentage: "",
            category: "",
            image: "",
            quantity: "",
            features: "",
          });
          setEditingItem(null); // Reset editing state
          navigate("/itemsList"); // Redirect back to Items List
        }, 1000);
      };
                      
    return (
        <motion.div
          className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-blue-300">
          {editingItem ? "Edit Item" : "Create Item"}
          </h2>
    
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Container: Form (70%) */}
            <div className=  {"bg-gray-900 p-6 rounded-lg shadow-md  w-full md:w-[70%]" }>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Item Code & Item Name */}
                <div className="flex flex-wrap md:flex-nowrap gap-4">
                  <div className="w-full md:w-1/2">
                    <label
                      className="block text-sm font-medium text-gray-300"
                      htmlFor="itemCode"
                    >
                      Item Code
                    </label>
                    <input
                      type="text"
                      id="itemCode"
                      name="itemCode"
                      value={newItem.itemCode}
                      onChange={handleChange}
                      
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
    
                {/* Row 2: Item type & Supplier Ref */}
                <div className="flex flex-wrap md:flex-nowrap gap-4">
                  <div className="w-full md:w-1/2">
                    <label
                      className="block text-sm font-medium text-gray-300"
                      htmlFor="type"
                    >
                      Type:
                    </label>
                    <label className="text-gray-300">
                        <input
                            type="radio"
                            name="type"
                            value="product"
                            checked={newItem.type === "product"}
                            onChange={handleChange}
                        /> Product
                    </label>
                    <label className="text-gray-300">
                        <input
                            type="radio"
                            name="type"
                            value="service"
                            checked={newItem.type === "service"}
                            onChange={handleChange}
                        /> Service
                    </label>
                    
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
                      <option value="">Select Category</option>
                    {(newItem.type === "product" ? productCategories : serviceCategories).map((cat) => (
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
                      type="text"
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
                   {loading ? <Loader className="ml-2 h-5 w-5 animate-spin" /> : (editingItem ? "Update Item" : "Create Item")}
                </button>
              </form>
            </div>
    
            {/* Right Container: Image Upload (30%) */}
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
                disabled={newItem.type === "service"}
              />
              <label
                htmlFor="image"
                className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Upload className="h-5 w-5 inline-block mr-2" />
                Upload Image
              </label>
            </div>
            
          </div>
        </motion.div>
      );
};

export default CreateItem;