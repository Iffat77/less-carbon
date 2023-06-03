import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import authService from "../services/auth";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
    // Perform any additional actions after logout (e.g., redirect)
  };

  return (
    <div className="bg-white  ">
      <div className=" flex flex-wrap items-center justify-between p-2">
        <Link className="flex " to="/">
          <img className="h-8 mr-3"></img>
          <span className="self-center text-2xl font-semibold whitespace-nowrap">Less Carbon</span>
          </Link>
        

        <ul className="flex sm:flex-col text-xl p-4 md:p-0 mt-4 md:mr-4 font-medium  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
          {authService.isAuthenticated() ? (
            <>
              <li>
                <Link className="block py-2 pl-3 pr-4 text-gray-700 rounded  md:hover:bg-transparent 0 md:p-0 " to="/profile">
                  <FaUser /> 
                </Link>
              </li>

                <li className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:cursor-pointer md:hover:bg-transparent 0 md:p-0 " onClick={handleLogout}>
                  <FaSignOutAlt /> 
                </li>
       
            </>
          ) : (
            <>
              <li>
                <Link className="block text-lg py-2 pl-3 pr-4 text-gray-700 rounded  md:hover:bg-transparent 0 md:p-0 " to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="block text-lg py-2 pl-3 pr-4 text-gray-700 rounded hover:cursor-pointer  md:hover:bg-transparent 0 md:p-0 " to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

    </div>
  );
}

export default Nav;
