import { Link } from "react-router-dom";
//import { useUserStore } from "../stores/useUserStore";
import { LogOut } from "lucide-react";

const Navbar = () => {
   // const { user, logout } = useUserStore();
   const user = true;
    const isAdmin = false;
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-blue-800">
        <div className="container mx-auto px-4 py-3">
            <div className="flex flex-wrap justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-400 items-center space-x-2 flex">
                iStreams CRM
            </Link>

            <nav className="flex flex-wrap items-center gap-4">

            {isAdmin && (
                    <Link 
                        className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                        to={"/secret-dashboard"}
                    >
                        <span className='hidden sm:inline'>Dashboard</span>
                    </Link>
                )}
                <Link 
                    to={"/"} 
                    className="text-gray-300 hover:text-blue-400 transition duration-300
					 ease-in-out">
                        Home
                </Link>


                {user ? (
                    <button 
                        className="className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                       // onClick={logout}
                    >
                        <LogOut size={18} />
                        <span className='hidden sm:inline ml-2'>Log Out</span>
                    </button>
                ) : (
                    <>
					    <Link
						    to={"/signup"}
							className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 
							rounded-md flex items-center transition duration-300 ease-in-out'
						>
							Sign Up
						</Link>
						<Link
						    to={"/login"}
							className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
							rounded-md flex items-center transition duration-300 ease-in-out'
						>
							Login
						</Link>
					</>
                )}
            </nav>
            </div>
        </div>
    </header>
  )
}

export default Navbar