import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaCartArrowDown } from "react-icons/fa";
import { MdAssignmentInd } from "react-icons/md";
import logo from "../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#6F7F80] shadow-md  w-full top-0 left-0">
      <div className="container mx-auto flex justify-between items-center py-4 px-20">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center justify-around">
            <img src={logo} alt="" className="w-10" />
            <h1 className="text-3xl font-bold text-gray-300 hover:text-gray-600 transition">
              ProShop
            </h1>
          </div>

          <ul className="hidden md:flex space-x-6 text-gray-300">
            <li>
              <Link to="/" className="hover:text-gray-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-600 transition flex justify-between items-center"
              >
                <FaCartArrowDown /> Cart
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-gray-600 transition flex justify-between items-center"
              >
                <MdAssignmentInd /> Sign In
              </Link>
            </li>
          </ul>
        </div>

        <div className="">
          <button
            className="md:hidden text-gray-300  w-24"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {isOpen && (
            <div className="container md:hidden shadow-md w-full">
              <ul className=" flex flex-col space-y-4 py-4 text-gray-600 ">
                <li>
                  <Link href="#" className="hover:text-gray-600 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-600 transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-gray-600 transition flex  items-center"
                  >
                    <FaCartArrowDown /> Cart
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-gray-600 transition flex items-center"
                  >
                    <MdAssignmentInd className="p-0 w-4" /> Sign In
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>

    // <nav className="bg-[#6F7F80] shadow-md  w-full top-0 left-0">
    //   <div className="container mx-auto flex justify-between items-center py-4 px-16">
    //     <div className="container mx-auto flex justify-between items-center px-4">
    //       {/* Logo */}
    //       <div className="flex justify-around items-center">
    //         <img src={logo} alt="logo" className="" />
    //         <h1 className="text-2xl font-bold text-white hover:text-gray-600">
    //           ProShop
    //         </h1>
    //       </div>

    //       <ul className="hidden md:flex space-x-6 text-gray-300">
    //         <li>
    //           <Link to="/" className="hover:text-gray-600 transition">
    //             Home
    //           </Link>
    //         </li>
    //         <li>
    //           <Link to="/about" className="hover:text-gray-600 transition">
    //             About
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             href="#"
    //             className="hover:text-gray-600 transition flex justify-between items-center"
    //           >
    //             <FaCartArrowDown /> Cart
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             href="#"
    //             className="hover:text-gray-600 transition flex justify-between items-center"
    //           >
    //             <MdAssignmentInd /> Sign In
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>

    //     <div className="">
    //       <button
    //         className="md:hidden text-gray-300  w-24"
    //         onClick={() => setIsOpen(!isOpen)}
    //         aria-label="Toggle Menu"
    //       >
    //         {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
    //       </button>

    //       {isOpen && (
    //         <div className="container md:hidden shadow-md w-full">
    //           <ul className=" flex flex-col space-y-4 py-4 text-gray-600 ">
    //             <li>
    //               <Link href="#" className="hover:text-gray-600 transition">
    //                 Home
    //               </Link>
    //             </li>
    //             <li>
    //               <Link href="#" className="hover:text-gray-600 transition">
    //                 About
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 href="#"
    //                 className="hover:text-gray-600 transition flex  items-center"
    //               >
    //                 <FaCartArrowDown /> Cart
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 href="#"
    //                 className="hover:text-gray-600 transition flex items-center"
    //               >
    //                 <MdAssignmentInd className="p-0 w-4" /> Sign In
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  );
}

export default Navbar;
