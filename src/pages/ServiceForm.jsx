import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {  Loader } from "lucide-react";
import toast from "react-hot-toast";

const categories = ["standard", "professional", "enterprise", "ultimate",];

const ServiceForm = () => {
  const [newService, setNewService] = useState({
    serviceCode: "",
    serviceName: "",
    service: "",
    supplierRef: "",
    salesPrice: "",
    marginPercentage: "",
    features:"",
  });

  const [services, setServies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load products from localStorage when component mounts
  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem("services")) || [];
    setServies(storedServices);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Service:", services );

    if (!newService.category) {
      toast.error("Please select a category before submitting.");
      return;
    }

    setLoading(true);

    // Save the new product to localStorage
    const updatedServices = [...services, newService];
    localStorage.setItem("services", JSON.stringify(updatedServices));

    setTimeout(() => {
      toast.success("Services added successfully!");
      setLoading(false);
      navigate("/servicePricing", { state: { services: updatedServices } });


      // Reset form
      setNewService({
        serviceCode: "",
        serviceName: "",
        service: "",
        supplierRef: "",
        salesPrice: "",
        marginPercentage: "",
        category: "",
        image: "",
        features:"",
      });

      setServies(updatedServices);
    }, 1000);
  };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setNewProduct({ ...newProduct, image: reader.result });
//       reader.readAsDataURL(file);
//     }
//   };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-blue-300">
        Create New Service
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        
        <div className="bg-gray-900 p-6 rounded-lg w-full shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Service Code & Service Name */}
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <div className="w-full md:w-1/2">
                <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="serviceCode"
                >
                  Service Code
                </label>
                <input
                  type="text"
                  id="serviceCode"
                  name="serviceCode"
                  value={newService.serviceCode}
                  onChange={(e) =>
                    setNewService({ ...newService, serviceCode: e.target.value })
                  }
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="w-full md:w-1/2">
                <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="serviceName"
                >
                  Service Name
                </label>
                <input
                  type="text"
                  id="serviceName"
                  name="serviceName"
                  value={newService.serviceName}
                  onChange={(e) =>
                    setNewService({ ...newService, serviceName: e.target.value })
                  }
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Row 2: Service & Supplier Ref */}
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <div className="w-full md:w-1/2">
                <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="service"
                >
                  Service
                </label>
                <input
                  type="text"
                  id="service"
                  name="service"
                  value={newService.service}
                  onChange={(e) =>
                    setNewService({ ...newService, service: e.target.value })
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
                  value={newService.supplierRef}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
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
                  value={newService.salesPrice}
                  onChange={(e) =>
                    setNewService({ ...newService, salesPrice: e.target.value })
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
                  value={newService.marginPercentage}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      marginPercentage: e.target.value,
                    })
                  }
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="w-full">
              <label
                className="block text-sm font-medium text-gray-300"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={newService.category}
                onChange={(e) =>
                    setNewService({ ...newService, category: e.target.value })
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

            {/* Features */}
            <div className="w-full">
              <label htmlFor="features" className="block text-sm font-medium text-gray-300">
                Features
              </label>
              <textarea 
                id="features"
                name="features"
                value={newService.features}
                onChange={(e) =>
                    setNewService({ ...newService, features: e.target.value })
                  }
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md flex items-center justify-center"
          disabled={loading}
        >
          Create Service {loading && <Loader className="ml-2 h-5 w-5 animate-spin" />}
        </button>
          </form>
        </div>

        {/* Right Container: Image Upload (30%) */}
        {/* <div className="bg-gray-900 p-6 rounded-lg w-full md:w-[30%] shadow-md flex flex-col items-center justify-end">
    {newProduct.image && (
      <img src={newProduct.image} alt="Uploaded Preview" className="w-52 h-80 rounded-md object-cover border border-gray-600 mb-3" />
    )}

    <input type="file" id="image" className="sr-only" accept="image/*" onChange={handleImageChange} />
    <label htmlFor="image" className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      <Upload className="h-5 w-5 inline-block mr-2" />
      Upload Image
    </label>
  </div> */}
      </div>
    </motion.div>
  );
};

export default ServiceForm;
