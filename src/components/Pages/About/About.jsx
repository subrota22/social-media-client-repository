import { useQuery } from '@tanstack/react-query';
import React, {  useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import Skeleton from '../../Share/Skeleton/Skeleton';
const About = () => {
    const [aboutInfo , setAboutInfo] = useState({}) ;
    const [info , setInfo] = useState(aboutInfo) ;
    const [showModal , setShowModal] = useState(true) ;
    const [btnDisabled , setDisabled] = useState(true) ;
     console.log(info);

    const { data: abouts = [], isLoading, refetch } = useQuery({
        queryKey: ['about'],
        queryFn: () => fetch("https://social-media-dusky.vercel.app/about")
            .then(res => res.json())
            .then(data => data)
            .catch(error => console.log(error))
    });

    //get about data
    const handleAboutData = (id) => {
        setShowModal(true) ;
        if(!id) return ;
        fetch(`https://social-media-dusky.vercel.app/about/${id}`)
        .then(res => res.json())
            .then(data => setAboutInfo(data))
            .catch(error => console.log(error))
    }
   //handleUpdate
   const handleUpdate = (event) => {
    event.preventDefault() ;
    fetch(`https://social-media-dusky.vercel.app/update-about-information/${aboutInfo._id}`, {
    method:"PUT" ,
    headers:{
        "Content-Type" : "application/json" ,
    } ,
    body: JSON.stringify(info) 
    })
    .then(res => res.json())
        .then(data => {
            setAboutInfo(data) ;
            refetch() ;
            setShowModal(false) ;
            toast.success("Your about information is updated !!") ;
            showModal(false) ;
        })
        .catch(error => console.log(error)) ;
   }
    //input values
    const handleOnchangeInputFeild = (event) =>{
        setDisabled(false) ;
        const feild = event.target.name ;
        const value = event.target.value ;
        const newinfo= {...aboutInfo} ;
        newinfo[feild] = value ;
        setInfo(newinfo) ;
        }
    if (isLoading) return <Skeleton></Skeleton>
    return (
        <>
            <Helmet><title>About page</title></Helmet>
            <div className="mx-auto my-20 text-center">
                <h2 className='text-3xl font-extrabold my-7'> You can update this all information.</h2>

                <div className="max-w-lg p-6 mx-auto bg-gray-700  border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

                    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                   {
                    showModal &&
                     <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="my-modal-3" className="btn btn-sm btn-primary text-xl mb-2 btn-circle absolute right-2 top-2">✕</label>
                            <form className="space-y-6" autoComplete='on' onSubmit={handleUpdate}>
                                <div>
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text"  onChange={handleOnchangeInputFeild}  defaultValue={aboutInfo?.name} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your name please"  />
                                </div>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email"  onChange={handleOnchangeInputFeild} defaultValue={aboutInfo?.email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your email please"  />
                                </div>
                                <div>
                                    <label for="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <input type="address" onChange={handleOnchangeInputFeild} defaultValue={aboutInfo?.address} name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your address please"  />
                                </div>
                                <div>
                                    <label for="university"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">University</label>
                                    <input type="university" onChange={handleOnchangeInputFeild} defaultValue={aboutInfo?.university} name="university" id="university" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your university please"  />
                                </div>
                                <div>
                                    <label for="profession"   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profession</label>
                                    <input type="text" onChange={handleOnchangeInputFeild} name="profession" defaultValue={aboutInfo?.profession} id="profession" placeholder="Enter your profession please" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                                </div>
                                <div>
                                    <label for="profile"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile url</label>
                                    <input type="text" onChange={handleOnchangeInputFeild} name="profile" defaultValue={aboutInfo?.profile} id="profile" placeholder="Enter your profile image url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                                </div>
                                <button type="submit" disabled={btnDisabled ? "disabled" : undefined} className="w-full  btn btn-info  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>

                            </form>
                        </div>
                    </div>
                    }

                    {
                        abouts.map(about =>

                            <div className='about' key={about._id}>

                                {/* The button to open modal */}
                                <label htmlFor="my-modal-3" onClick={() => handleAboutData(about?._id  , setShowModal(true))} className="btn btn-primary px-8 my-10 md:-mt-12  float-right">Edit</label>
                                <div className="text-center">
                                    <img src={about?.profile} alt="profile"
                                    className='w-40 h-40 rounded-full ml-36 mt-12 mb-3 border-2  border-info' />
                                </div>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white  dark:text-white">Name: {about?.name} </h5>
                                <p className="mb-3 font-normal  text-white">Profession: {about?.profession} </p>

                                <p className="mb-3 font-normal  text-white">Email: {about?.email}</p>
                                <p className="mb-3 font-normal  text-white">University: {about?.university} </p>
                                <p className="mb-3 font-normal  text-white">Address: {about?.address}</p>

                            </div>
                        )
                    }
                </div>
            </div>

        </>
    );
};

export default About;