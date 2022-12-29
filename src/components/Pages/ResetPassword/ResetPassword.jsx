import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../UserContext/UserContext';

const ResetPassword = () => {
const {resetPassword} = useContext(AuthProvider) ;
const [resetLoad , setResetLoad] = useState(false) ;
const handleSubmit = (event) => {
event.preventDefault() ;
setResetLoad(true) ;
const email = event.target.email.value ;
resetPassword(email)
.then(() => {
toast.success("Please check your inbox or spam to reset your password.") ;
setResetLoad(false) ;
})
.catch(error => {toast.error(error.message) ; setResetLoad(false) ; }) ;

}
    return (
        <>
            <Helmet><title>Reset password </title></Helmet>
<form autoComplete='off' className='my-20 border rounded-md p-10 mx-auto w-96 bg-slate-700 text-white' onSubmit={handleSubmit}>
  <div className="mb-6">
    <label for="email" className="block mb-2 text-sm font-medium  dark:text-white">Your email</label>
    <input type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your valid email address" required/>
  </div>


  <div className="flex items-start mb-6">
    <div className="flex items-center h-5">
      <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
    </div>
    <label for="remember" className="ml-2 text-sm font-medium  dark:text-gray-300">Remember me</label>
  </div>
  <button type="submit" className="text-white btn btn-info w-full  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
{ resetLoad ?   <ClipLoader color='white' className='pb-3 text-center'></ClipLoader>  : " Send request"}
  
  </button>
</form>

        </>
    );
};

export default ResetPassword;