import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    itemCode: "",
    itemName: "",
    product: "",
    supplierRef: "",
    salesPrice: "",
    marginPercentage: "",
    category: "",
    image: "",
    quantity: "",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [heading, setHeading] = useState("Create Product");
  const [buttonLabel, setButtonLabel] = useState("Add Product");
  const [isEditMode, setIsEditMode] = useState(false);
  const editingProduct = location.state?.product || null;
  const productToEdit = location.state?.product || null;

  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    category: "",
    salesPrice: "",
    supplierRef: "",
    quantity: "",
    image: ""
  });

  useEffect(() => {
    if (productToEdit) {
      setHeading("Edit Product");
      setButtonLabel("Update Product");
      setFormData(productToEdit); // Populate form with product data
    }
  }, [productToEdit]);

  // Load products from localStorage when component mounts
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    if (editingProduct) {
      setNewProduct(editingProduct);
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!newProduct.category) {
      toast.error("Please select a category before submitting.");
      return;
    }
  
    setLoading(true);
  
    // Check if product exists based on `itemCode`
    const existingIndex = products.findIndex((p) => p.itemCode === newProduct.itemCode);
    
    let updatedProducts;
    
    if (existingIndex !== -1) {
      // Update existing product
      updatedProducts = [...products];
      updatedProducts[existingIndex] = newProduct;
      setIsEditMode(true);
    } else {
      // Add new product
      updatedProducts = [...products, newProduct];
      setIsEditMode(false);
    }
  
    setProducts(updatedProducts);
  
    setTimeout(() => {
      localStorage.setItem("products", JSON.stringify(updatedProducts));
  
      toast.success(existingIndex !== -1 ? "Product updated successfully!" : "Product added successfully!");
      setLoading(false);
  
      navigate(`/products/${newProduct.category.toLowerCase()}`, {
        state: { products: updatedProducts },
      });
  
      // Reset form
      setNewProduct({
        itemCode: "",
        itemName: "",
        product: "",
        supplierRef: "",
        salesPrice: "",
        marginPercentage: "",
        category: "",
        image: "",
        quantity: "",
      });
      setIsEditMode(false);
    }, 1000);
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setNewProduct({ ...newProduct, image: reader.result });
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
      <h2 className="text-2xl font-semibold mb-6 text-blue-300">
      {heading}
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Container: Form (70%) */}
        <div className="bg-gray-900 p-6 rounded-lg w-full md:w-[70%] shadow-md">
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
                  value={newProduct.itemCode}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, itemCode: e.target.value })
                  }
                  disabled={!!productToEdit}
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
                  value={newProduct.itemName}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, itemName: e.target.value })
                  }
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
                  htmlFor="product"
                >
                  Product
                </label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  value={newProduct.product}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, product: e.target.value })
                  }
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
                  value={newProduct.supplierRef}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      supplierRef: e.target.value,
                    })
                  }
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
                  value={newProduct.salesPrice}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, salesPrice: e.target.value })
                  }
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
                  value={newProduct.marginPercentage}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      marginPercentage: e.target.value,
                    })
                  }
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
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
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
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
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
                //value={}
                //onChange={}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md flex items-center justify-center"
              disabled={loading}
            >
              {buttonLabel}
              {loading && <Loader className="ml-2 h-5 w-5 animate-spin" />}
            </button>
          </form>
        </div>

        {/* Right Container: Image Upload (30%) */}
        <div className="bg-gray-900 p-6 rounded-lg w-full md:w-[30%] shadow-md flex flex-col items-center justify-end">
          {newProduct.image && (
            <img
              src={newProduct.image}
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
      </div>
    </motion.div>
  );
};

export default CreateProductForm;
