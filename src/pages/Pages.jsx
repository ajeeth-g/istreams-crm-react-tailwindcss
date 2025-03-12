import { motion } from "framer-motion";


const Pages = () => {

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-lg p-6 border border-gray-700 h-full flex md:flex-row flex-col gap-4 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
    </motion.div>
  );
};

export default Pages;
