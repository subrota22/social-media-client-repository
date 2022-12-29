import React from 'react';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../UserContext/UserContext';

const Navbar = () => {
  const { user, setUserData, signOutUser } = useContext(AuthProvider);
const navigate = useNavigate() ;
  //log out
  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Your account has been log out successfully !! ");
        navigate("/") ;
        setUserData({});
      })
      .catch(error => toast.error(error.message));
  }
  return (
    <>
      <nav className="px-2 py-4 bg-gray-700  dark:bg-gray-900 dark:border-gray-700">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <NavLink to="/" className="flex items-center">
            <img src="https://i.ibb.co/t24rYP0/post-Image.png" className=" mr-3 sm:h-14 h-14 uppercase" alt="Post Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-info uppercase">your think</span>
          </NavLink>
          <button data-collapse-toggle="navbar-multi-level" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
            <ul className="flex flex-col p-4 mt-4  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <NavLink to="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent  md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</NavLink>
              </li>
              {
                !user.uid && <>
                  <li>
                    <NavLink to="/register" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent  md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent  md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page"> Login </NavLink>
                  </li>
                </>
              }
              <li>

            <div className="dropdown -mt-8">
                  <label tabIndex={0} className="btn btn-info text-white mt-12 md:my-0 m-1">More link</label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                 
                    <li>
                      <NavLink to="/media" className="block text-info px-4 py-2 hover:bg-gray700 dark:hover:bg-gray-600 ">Media</NavLink>
                    </li>
                    {   user?.uid && 
              <>
                     <li>
                      <NavLink to="/about" className="block px-4 py-2 hover:bg-gray-700 text-info dark:hover:bg-gray-600 ">About</NavLink>
                    </li>
                    <div className="py-1" onClick={handleLogOut}>
                      <button className="block w-full px-6  text-sm btn btn-warning dark:hover:bg-gray-600 text-white">Sign out</button>
                    </div>
              </>
}
                  </ul>
                </div>
              </li>
              <li>
                    <NavLink to="/media" className="block py-2 pl-3 pr-4 rounded hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Media</NavLink>
                  </li>
              {
                user.uid && <>
                
                  <li>
                    <NavLink to="/about" className="block py-2 pl-3 pr-4  rounded hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">About</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" className="block py-2 pl-3 pr-4rounded hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 ">Contact</NavLink>
                  </li>
                </>
              }
             
      {    user?.uid &&    <div className="tooltip tooltip-open tooltip-bottom text-info" data-tip={user?.displayName}>
                <div className="avatar">
                  <div className="w-12 rounded-full -mt-3 ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL ? user?.photoURL : "https://i.ibb.co/RSCmwXf/imagenot.jpg"} alt='profile' />
                  </div>
                </div>
              </div>}
            </ul>
          </div>
        </div>
      </nav>





    </>
  );
};

export default Navbar;