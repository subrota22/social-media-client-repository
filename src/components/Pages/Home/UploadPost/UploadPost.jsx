import React, { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { AuthProvider } from '../../../UserContext/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
const UploadPost = () => {
    const [fileName, setFileName] = useState({});
    const [fileStatus, setFileStatus] = useState(false);
    // console.log(fileName);
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setFileName(acceptedFiles[0]);
        setFileStatus(true);
    }, []) ;
    const { user } = useContext(AuthProvider);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    //navigate
    const navigate = useNavigate() ;
    const [loadPost , setLoadPost] = useState(false) ;
    const formData = new FormData();
    formData.append("image", fileName);


    const imageBbKey = process.env.REACT_APP_imageBbKey;
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoadPost(true) ;
        if(!user?.uid) {
        toast.info("Please login first to add your post") ;
        setLoadPost(false) ;
        return ;
        }
        const text = event.target.text.value;
        fetch(`https://api.imgbb.com/1/upload?key=${imageBbKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                const imageLink = data.data.display_url;
                const postData = {
                    postImage: imageLink,
                    postText: text,
                    date: new Date().toLocaleDateString() ,
                    time:new Date().toLocaleTimeString() , 
                    email:user?.email , 
                    profile: user?.displayName,
                }
                fetch("https://social-media-subrota22.vercel.app/posts", {
                    method: "POST",
                    headers: {
                        
                        "Content-Type": "application/json",
                        authentication: `Bearer ${localStorage.getItem("social-media-token")} ` ,
                    },
                    body: JSON.stringify(postData)
                })
                    .then(res => {
                        if(res.status === 403){
                         return <Navigate to="/login"></Navigate>
                        }
                        return res.json() ;
                    })
                    .then(data => {
                        if (data.acknowledged) {
                            toast.success("Congrasulations your post send sucessfully !! ");
                            navigate("/media");
                            setLoadPost(false) ;
                        }
                    })
            })
            .catch(error => {console.log(error) ; setLoadPost(false)})

    }

    return (
        <>

            <form className='py-10 text-white border-2 my-16 bg-gray-700 rounded-3xl mx-auto p-12 ' autoComplete='off' id='postNow' onSubmit={handleSubmit} style={{width:"40%"}}>
                <h2 className='text-white text-2xl text-center my-3 uppercase'> Add your post </h2>
                <div className="my-20 w-full ">
                    <div className="relative z-0 mb-6 w-full group">
                        <textarea cols="10" rows="5" name="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm  dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 text-white peer-focus:-translate-y-6">Post text </label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group border-2 text-center">
                        <div {...getRootProps()} className="border-1 rounded-xl hover:cursor-pointer p-8">
                            <input {...getInputProps()} />
                            {
                                fileStatus ? <p > Your file is selected file name is : {fileName.name} </p> : <>
                                    {
                                        isDragActive ?
                                        <ClipLoader color='white' className='pb-3 text-center'></ClipLoader>  :
                                            <p>Drop the post image here ...</p>
                                    }
                                </>
                            }

                        </div>
                    </div>
                </div>
                <div className="text-center">

                    <button type="submit" className="text-white w-full btn btn-info focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                     { loadPost ? <ClipLoader color='white' className='pb-3'></ClipLoader> : "Send post"}
                        
                        </button>
                </div>
            </form>
        </>
    );
};

export default UploadPost;