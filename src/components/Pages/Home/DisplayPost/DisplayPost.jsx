
import { useQuery } from '@tanstack/react-query';
import React, { } from 'react';
import { Helmet } from 'react-helmet';
import Skeleton from '../../../Share/Skeleton/Skeleton';


const DisplayPost = () => {

    const { data: posts, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: () => fetch("https://social-media-dusky.vercel.app/topPosts")
            .then(res => res.json())
            .then(data => data)
            .catch(error => console.log(error))
    })

    if (isLoading) {
        return <Skeleton></Skeleton>
    }
    return (
        <>
            <Helmet><title>Media</title></Helmet>
            <h2 className='text-center text-white text-2xl my-4'> Our top <span className='text-info'>{posts.length}</span> post is here !! </h2>
            <div className="ml-32 md:ml-0">
            <div className="grid grid-cols-1 md:grid-cols-2 mx-4 lg:grid-cols-3 gap-5 my-4">

                {
                    posts.map(post =>
                        <div key={post._id} className="max-w-sm bg-gray-700 hover:scale-95 cursor-pointer  duration-1000 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <img className="rounded-t-lg h-80 w-full" src={post?.postImage ? post?.postImage : "https://i.ibb.co/RSCmwXf/imagenot.jpg"} alt="postImage" />
                            <div className="p-5">
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    { post?.postText?.length > 100 ?  post?.postText?.slice(0 , 100) + "..." :  post?.postText}
                                </p>
                            <p className='text-info text-md mt-2'> Post time: {post?.time ?post?.time : "00/00/00" } </p>
                            <p className='text-info text-md mt-2'>Post date: {post?.date ?post?.date : "00/00/00"} </p>
                                <p className='text-info'>Total likes : <span className='btn btn-circle btn-primary text-white p-2'>{post?.likes ? post?.likes : "0"}</span></p>
                            </div>
                        </div>
                    )
                }

            </div>
            </div>
        </>
    );
};

export default DisplayPost;