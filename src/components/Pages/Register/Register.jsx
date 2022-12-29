import React, { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../UserContext/UserContext';
import ClipLoader from "react-spinners/ClipLoader";
const Register = () => {
    const [fileName, setFileName] = useState({});
    const [fileStatus, setFileStatus] = useState(false);
    const [registerLoad, setRegisterLoad] = useState(false);
    const naviagate = useNavigate();
    //create user 
    const {
        createNewUser, sendEmailVerify, loginWithGoogle,
        loginWithGitHub , updateUser
    } = useContext(AuthProvider);
    // console.log(fileName);
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setFileName(acceptedFiles[0]);
        setFileStatus(true);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    //
    const formData = new FormData();
    formData.append("image", fileName);

    const imageBbKey = process.env.REACT_APP_imageBbKey;
    const handleSubmit = (event) => {
        event.preventDefault();
        setRegisterLoad(true);
        const email = event.target.email.value.trim();
        const password = event.target.password.value.trim();
        const repeat_password = event.target.repeat_password.value.trim();
        if (password !== repeat_password) {
            toast.warning("Mismatched your password please try agian");
            return;
        }
        const first_name = event.target.first_name.value.trim();
        const last_name = event.target.last_name.value.trim();
        const name = first_name + last_name;
        const phone_number = event.target.phone_number.value.trim();
        const company_name = event.target.phone_number.value.trim();
        console.log(email);
        fetch(`https://api.imgbb.com/1/upload?key=${imageBbKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                createNewUser(email, password)
                    .then((result) => {
                        console.log(result);

                        const imageLink = data.data.display_url;
                        const postData = {
                            name: name,
                            email: email,
                            profile: imageLink,
                            phoneNumber: phone_number,
                            companyName: company_name,
                        }
                        fetch("https://social-media-dusky.vercel.app/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(postData)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.acknowledged) {
                                    toast.success("Congrasulations your account created sucessfully !! ");
                                    setRegisterLoad(false);
                                    sendEmailVerify()
                                        .then(() => {
                                            toast.info("Please check your inbox or spam to verify your email address.") ;
                                            updateUser(name , imageLink)
                                            .then(() => {
                                            toast.success("Your data added successfully !! ") ;
                                            })    
                                        })
                                        .catch(error => toast.error(error.message));
                                    naviagate("/");

                                }
                            })
                    })
                    .catch(error => { toast.error(error.message); setRegisterLoad(false) });

            })
            .catch(error => { console.log(error); setRegisterLoad(false) })

    }

    //handle google login
    const handleGoogleLogin = () => {
        setRegisterLoad(true);
        loginWithGoogle()
            .then(() => {
                toast.success("Your are login successfully with Google account !!");
                setRegisterLoad(false);
                naviagate("/");
            })
            .catch(error => { toast.error(error.message); setRegisterLoad(false) });

    }
    //handle github login
    const handleGitHubLogin = () => {
        setRegisterLoad(true);
        loginWithGitHub()
            .then(() => {
                toast.success("Your are login successfully with GitHub account !!");
                setRegisterLoad(false);
                naviagate("/");
            })
            .catch(error => { toast.error(error.message); setRegisterLoad(false) });

    }
    //naviagate 

    return (
        <>
            <Helmet> <title> Register </title></Helmet>
            <form autoComplete='off' onSubmit={handleSubmit} className='mx-auto my-12 text-lg border rounded-xl p-7 bg-gray-700' style={{ width: "50%" }}>
                <h2 className='text-3xl text-white text-center my-4'> Register now </h2>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="text" name="first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="text" name="last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="number" pattern='[0-9]' name="phone_number" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="text" name="company_name" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
                    </div>
                </div>

                <div className="relative z-0 mb-6 w-full group border-2">
                    <div {...getRootProps()} className="border-1 rounded-xl text-center hover:cursor-pointer p-8">
                        <input {...getInputProps()} />
                        {
                            fileStatus ? <p > Your file is selected file name is : {fileName.name} </p> : <>
                                {
                                    isDragActive ?
                                        <ClipLoader color='white' className='pb-3 text-center'></ClipLoader> :
                                        <p>Drop the post image here ...</p>
                                }
                            </>
                        }

                    </div>
                </div>


                <button type="submit" className="text-white btn btn-info focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {registerLoad ? <ClipLoader color='white' className='pb-3'></ClipLoader> : "Register"}
                </button>
                <p className='my-4'>

                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="divider divide-red-500">Or you can </div>
                        <div onClick={handleGoogleLogin} className="grid h-12 card rounded-box place-items-center bg-green-400 my-3 hover:cursor-pointer"> Register with Google </div>
                        <div onClick={handleGitHubLogin} className="grid h-12 card rounded-box place-items-center bg-green-400 my-3 hover:cursor-pointer"> Register with GitHub </div>
                    </div>

                    <NavLink to="/login">Already have an account please <span className='text-info'>Login now</span> </NavLink>
                </p>
            </form>

        </>
    );
};

export default Register;