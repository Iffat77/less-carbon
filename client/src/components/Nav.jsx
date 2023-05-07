import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import authService from '../services/auth';
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
    // Perform any additional actions after logout (e.g., redirect)
  };

  return (
    <div className='w-screen h-1/6  border border-blue-300'>
      <div className='flex flex-wrap items-center justify-between mx-auto mt-3'>
        <div className='logo font-bold text-2xl'>
          <Link to='/'>Walls</Link>
        </div>

        <ul className='w-1/4 flex flex-row gap-4 justify-center'>
          {authService.isAuthenticated() ? (
            <>
              <li>
                <Link to='/profile'>
                  <FaUser /> Profile
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login'>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  <FaUser /> Register
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
