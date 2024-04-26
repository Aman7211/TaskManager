import React, {  useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';

export default function Navbar() {

  const navigate = useNavigate();

const menuRef = useRef(null);


const toggleMenu = () => {
  menuRef.current.classList.toggle('show_menu');
}
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex bg-[#e99e2ddb] h-16 border-b-[2px] border-b-yellow-600 ">
      <div className="flex items-center justify-between w-full px-6">
        <Link to="/">
          <h1 className='text-red-800 font-bold text-[24px]'>MEGHPLAT ASSIGNMENT</h1>
        </Link>
        <ul className="mt-3 hidden md:flex " ref={menuRef} onClick={toggleMenu}>
        {!localStorage.getItem("authToken") ? 
        <>
          <li >
          <Link className="text-[20px] text-gray-800 font-medium no-underline hover:text-red-800" to="/">Home</Link>
        </li>
          </>
          :
          <>
          <li >
          <Link className="text-[20px] text-blue-900 font-bold no-underline hover:text-gray-500" to="/">DASHBOARD</Link>
        </li>
            </>
         }
        </ul>

        <div className="flex items-center">
          {!localStorage.getItem("authToken") ?
            <div className='flex'> 
              <Link className="bg-[#ffff] text-red-600 p-2 rounded-xl font-medium mx-3" to="/login">Login</Link>
              <Link className="bg-[#ffff] text-red-600 p-2 rounded-xl font-medium" to="/signup">Signup</Link>
            </div>
            :
            <div className='flex items-center'>
              <div className='bg-[#ffff] text-red-600 p-2 rounded-xl font-medium ' onClick={handleLogout}>Logout</div>
            </div>
          }
        </div>
     
      </div>
      <div className="md:hidden text-[30px] " onClick={toggleMenu}>
            <BiMenu className="cursor-pointer mx-2 mt-3 justify-end" />
          </div>
    </div>
  );
}
