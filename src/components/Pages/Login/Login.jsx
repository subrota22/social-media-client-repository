import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../UserContext/UserContext';

const Login = () => {
  const [loginLoad, setLoginLoad] = useState(false);
  const {
    loginUser, loginWithGoogle, loginWithGitHub,
  } = useContext(AuthProvider);
  const naviagate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginLoad(true);
    const email = event.target.email.value;
    const password = event.target.password.value;
    loginUser(email, password)
      .then(() => {
        toast.success("Congrasulations you are login successfully !!");
        setLoginLoad(false);
        naviagate("/") ;
      })
      .catch(error => toast.error(error.message))
  }
  //handle google login
  const handleGoogleLogin = () => {
    setLoginLoad(true);
    loginWithGoogle()
      .then(() => {
        toast.success("Your are login successfully with Google account !!");
        setLoginLoad(false);
        naviagate("/") ;
      })
      .catch(error => { toast.error(error.message); setLoginLoad(false) });

  }
  //handle github login
  const handleGitHubLogin = () => {
    setLoginLoad(true);
    loginWithGitHub()
      .then(() => {
        toast.success("Your are login successfully with GitHub account !!");
        setLoginLoad(false);
        naviagate("/") ;
      })
      .catch(error => { toast.error(error.message); setLoginLoad(false) });

  }
  return (
    <>
      <Helmet><title>Login</title></Helmet>

      <form autoComplete='off' onSubmit={handleSubmit} className='mx-auto my-12 border rounded-xl p-7 bg-gray-700' style={{ width: "40%" }}>
        <h2 className='text-3xl text-white text-center mt-0 mb-7'> Login now </h2>
        <div className="relative z-0 mb-6 w-full group">
          <input type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>

        <button type="submit" className="text-white btn btn-info   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {loginLoad ? <ClipLoader color='white' className='pb-3'></ClipLoader> : "Login "}
        </button>
        <p className='my-4'>
          <NavLink to="/register">If you don't have account please <span className='text-info'>Register now</span> </NavLink>
        </p>
        <p className='my-4'>
          <NavLink to="/reset-password">If yo forgot password please <span className='text-info'>Reset password</span> </NavLink>
        </p>

        <div className="flex flex-col w-full border-opacity-50">
          <div className="divider divide-red-500">Or you can </div>
          <div onClick={handleGoogleLogin} className="grid h-12 card rounded-box place-items-center bg-green-400 my-3 hover:cursor-pointer"> Login with Google </div>
          <div onClick={handleGitHubLogin} className="grid h-12 card rounded-box place-items-center bg-green-400 my-3 hover:cursor-pointer"> Login with GitHub </div>
        </div>
      </form>

    </>
  );
};

export default Login;