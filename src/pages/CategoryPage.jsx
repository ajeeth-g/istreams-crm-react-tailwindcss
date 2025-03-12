// import { Link } from "react-router-dom";
import CategoryItem from "../components/CategoryItem";

// const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];
const categories = [
    { href: "/jeans", name: "jeans", imageUrl: "/jeans.jpg" },
    { href: "/t-shirts", name: "t-shirts", imageUrl: "/tshirts.jpg" },
    { href: "/shoes", name: "shoes", imageUrl: "/shoes.jpg" },
    { href: "/glasses", name: "glasses", imageUrl: "/glasses.png" },
    { href: "/jackets", name: "jackets", imageUrl: "/jackets.jpg" },
    { href: "/suits", name: "suits", imageUrl: "/suits.jpg" },
    { href: "/bags", name: "bags", imageUrl: "/bags.jpg" },
  ];

const CategoryPage = () => {


	return (
		<div className="p-6">
		  <h2 className="text-2xl font-semibold text-blue-300 mb-4">Categories</h2>
		  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{categories.map((category) => (
				  <CategoryItem 
				  to={`/products/${category}`}
				  category={category}
				  key={category.name}
				  
			  /> 
			//   <Link
			// 	key={category}
			// 	to={`/products/${category}`}
			// 	className="bg-gray-800 text-white p-4 rounded-lg text-center hover:bg-gray-700"
			//   >
			// 	{category.charAt(0).toUpperCase() + category.slice(1)}
			//   </Link>
			
			))}
		  </div>
		</div>
	  );
	};

export default CategoryPage;