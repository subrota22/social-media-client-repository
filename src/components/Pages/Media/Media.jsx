
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import Skeleton from '../../Share/Skeleton/Skeleton';

const Media = () => {
    const axios = require('axios').default;
    const [pageLoading, setPageLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get("https://social-media-dusky.vercel.app/posts")
            .then(data => {
                setPosts(data.data);
                setPageLoading(false);
            })
            .catch(error => console.log(error))
    }, [axios])
    //   console.log(posts);
    if (pageLoading) {
        return <Skeleton></Skeleton>
    }
    return (
        <>
            <Helmet><title>Media</title></Helmet>
            <h2 className='text-center text-white text-2xl my-4'> Total <span className='text-info'>{posts.length}</span> post found !! </h2>
          <div className="ml-32 md:ml-0">
          <div className="grid grid-cols-1 md:grid-cols-2 ml-4 lg:grid-cols-3 my-12 gap-5">

{
    posts.map(post =>
        <div key={post._id} className="max-w-sm bg-gray-700 hover:scale-95 cursor-pointer  duration-1000 text-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <NavLink href="/hello">
                <img className="rounded-t-lg h-80 w-full" src={post?.postImage ? post?.postImage : "https://i.ibb.co/RSCmwXf/imagenot.jpg"} alt="postImage" />
            </NavLink>
            <div className="p-5">
               <p className="mb-3 font-normal text-white dark:text-gray-400">
                    { post?.postText?.length > 100 ?  post?.postText?.slice(0 , 100) + "..." :  post?.postText}
                </p>

                <p className='text-info'>Total likes : <span className='btn btn-circle btn-primary text-white p-2'>{post?.likes ? post?.likes : "0"}</span></p>
                
                <h5 className="mb-2  font-bold tracking-tight text-white dark:text-white">Post time: {post?.time ? post?.time : "00/00/00" }</h5>
                <h5 className="mb-2  font-bold tracking-tight text-white dark:text-white">Post date: {post?.date ? post?.date : "00/00/00"}</h5>
                
                <NavLink to={`/post-detials/${post?._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Show details
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </NavLink>
            </div>
        </div>
    )
}

</div>
          </div>


        </>
    );
};

export default Media;