
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData, useNavigate } from 'react-router-dom';
import emptyHeart from "../../../images/emptyHeart.png";
import redHeart from "../../../images/redHeart.png";
import blackHeart from "../../../images/blackHeart.png";
import { useQuery } from "@tanstack/react-query";
import Skeleton from '../../Share/Skeleton/Skeleton';
import { AuthProvider } from '../../UserContext/UserContext';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
const PostDetails = () => {
    //https://social-media-subrota22.vercel.app/
    const singlePostData = useLoaderData();
    const postId = singlePostData._id;
    const [likerInfo, setLikerInfo] = useState({});
    const [dislikerInfo, setDislikerInfo] = useState({});
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [dislikeLoad, setDislikeLoad] = useState(false);
    const [likeLoad, setLikeLoad] = useState(false);
    const navigate = useNavigate() ;

    const { user , setLoad , setUserData , signOutUser} = useContext(AuthProvider);
    const likerData = {
        likerName: user?.displayName,
        likerEmail: user?.email,
        likeId: postId,
    }

    const dislikerData = {
        dislikerName: user?.displayName,
        dislikerEmail: user?.email,
        dislikeId: postId,
    }
    //get post data
    const { data: post = {}, isLoading, refetch } = useQuery({
        queryKey: ['post'],
        queryFn:  () => 
            fetch(`https://social-media-subrota22.vercel.app/posts/${postId}` , 
                {
                   headers:{
                       authentication: `Bearer ${localStorage.getItem("social-media-token")}` 
                   }  
            })
            .then(res => {
                if(res.status === 403) {
                    setUserData({});
                    signOutUser() ;
                    return navigate("/login")  ;
                }else{
                    return res.json() ;
                }
            })
            .then(data =>  {
                setLoad(false) ;
                return data;
            }) 
          
    })

    //get liker

    React.useEffect(() => {
        const url = `https://social-media-subrota22.vercel.app/likerData?email=${user?.email}&&id=${postId}`;
        fetch(url , {
            headers:{
                authentication: `Bearer ${localStorage.getItem("social-media-token")} ` 
            }   
        })
            .then(res => res.json())
            .then(data => {
                setLikerInfo(data);
            });

    }, [postId, user?.email]);

    //get disliker

    React.useEffect(() => {
        const url = `https://social-media-subrota22.vercel.app/dislikerData?email=${user?.email}&&id=${postId}`;
        fetch(url , 
             {
                headers:{
                    authentication: `Bearer ${localStorage.getItem("social-media-token")} ` 
                }  
        })
            .then(res => res.json())
            .then(data => {
                setDislikerInfo(data);
                // console.log("--->", data);
            });

    }, [postId, user?.email]);


    //send like 

    const handleLike = () => {
        setLikeLoad(true) ;
        fetch(`https://social-media-subrota22.vercel.app/postLike?postId=${postId}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' ,
                authentication: `Bearer ${localStorage.getItem("social-media-token")} ` 
            }
            ,
            body: JSON.stringify(likerData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                    setLikeLoad(false) ;
                }
            })
            .catch(error => console.log(error));
        setLike(true);
    }

    //send withdraw like

    const handleWithdrawLike = () => {
        setLikeLoad(true) ;
        fetch(`https://social-media-subrota22.vercel.app/postWithdrawLike?postId=${postId}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' ,
                authentication: `Bearer ${localStorage.getItem("social-media-token")} ` 
            }
            ,
            body: JSON.stringify(likerData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                    setLikeLoad(false) ;
                }
            })
            .catch(error => console.log(error));
        setLike(false);
        setLikerInfo({});
    }

    //send dislike 

    const handleDislike = () => {
        setDislikeLoad(true) ;
        fetch(`https://social-media-subrota22.vercel.app/postDisLike?postId=${postId}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' ,
                authentication: `Bearer ${localStorage.getItem("social-media-token")} ` 
            }
            ,
            body: JSON.stringify(dislikerData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                    setDislikeLoad(false) ;
                }
            })
            .catch(error => console.log(error));
        setDislike(true);
    }

    //send withdraw dislike 

    const handleWithdrawDislike = () => {
        setDislikeLoad(true) ;
        fetch(`https://social-media-subrota22.vercel.app/postWithdrawDisike?postId=${postId}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' ,
                authentication: `Bearer ${localStorage.getItem("social-media-token")} ` 
            }
            ,
            body: JSON.stringify(likerData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                    setDislikeLoad(false) ;
                }
            })
            .catch(error => console.log(error));
        setDislike(false);
        setDislikerInfo({});
    }

    //comment 
    const handleSubmit = (event) => {
        event.preventDefault();
        const comment = event.target.comment.value;
        const commentData = {
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            comment: comment,
            name: user?.displayName,
            email: user?.email,
            profile: user?.photoURL,
            postId: postId,
        }
        fetch("https://social-media-subrota22.vercel.app/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authentication: `Bearer ${localStorage.getItem("social-media-token")} ` 
            },
            body: JSON.stringify(commentData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Your comment send successfully !! ");
                    commentsFetch();
                }
            })
    };

    //get all comment 

    const { data: comments = [], isLoading: commentsLoad, refetch: commentsFetch } = useQuery({
        queryKey: ["comments"],
        queryFn: () => fetch(`https://social-media-subrota22.vercel.app/comments/${postId}` , {
            headers:{
                authentication: `Bearer ${localStorage.getItem("social-media-token")} ` 
            }
        })
            .then(res => res.json())
            .then(data => data)
    });

    if (isLoading) {
        return <Skeleton></Skeleton>
    }

    return (
        <>
            <Helmet><title> Post details </title></Helmet>
            <h2 className='text-center my-4 text-2xl'>  Post detials </h2>

            <div className="justify-center mx-auto my-20" style={{ width: "50%" }}>
                <div class="flex flex-col items-center bg-gray-700 border rounded-lg shadow-md md:flex-col  hover:bg-cyan-700 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img class="object-cover w-40 h-40 rounded-full border-2 border-primary my-3" src={post?.postImage ? post?.postImage : "https://i.ibb.co/RSCmwXf/imagenot.jpg"} alt="postImage" />
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <p class="mb-3 font-normal text-xl">{post?.postText ? post?.postText : "text not found"}</p>
                        <h5 className="mb-2 text-lg font-bold tracking-tight dark:text-white">Post time: {post?.time ? post?.time : "00/00/00"}</h5>
                        <h5 className="mb-2 text-lg font-bold tracking-tight dark:text-white">Post date: {post?.date ? post?.date : "00/00/00"}</h5>

                        <div className="flex justify-between ">
                            {/* ----------- like ---------*/}
                            <div className="flex">
                                {
                                    likerInfo?.likerEmail === user?.email || like === true ?
                                        <>
                                            <img src={redHeart} alt="emptyHeart" onClick={handleWithdrawLike}
                                                className='h-10 w-10 hover:cursor-pointer' />

                                        </>
                                        :
                                        <img src={emptyHeart} alt="emptyHeart" onClick={handleLike}
                                            className='h-10 w-10 hover:cursor-pointer' />
                                }
                                <p className='text-info mx-4 text-lg'> <strong>Likes: <span className='btn btn-circle text-2xl btn-info text-white'>{likeLoad? <ClipLoader color='white'></ClipLoader> :  post?.likes ? post?.likes : "0"}</span> </strong> </p>
                            </div>
                            {/* --------------- dislik ------------- */}

                            <div className="flex mx-3">
                                {
                                    dislikerInfo?.dislikerEmail === user?.email || dislike === true ?
                                        <>
                                            <img src={blackHeart} alt="blackHeart" onClick={handleWithdrawDislike}
                                                className='h-10 w-10 hover:cursor-pointer' />

                                        </>
                                        :
                                        <img src={emptyHeart} alt="emptyHeart" onClick={handleDislike}
                                            className='h-10 w-10 hover:cursor-pointer' />
                                }
                                <p className='text-info  mx-4 text-lg'> <strong>Disikes: <span className='btn btn-circle text-2xl btn-info text-white'>{dislikeLoad ? <ClipLoader color='white'></ClipLoader> :  post?.disLikes ? post?.disLikes : "0"}</span> </strong> </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <form method='post' autoComplete='off' onSubmit={handleSubmit}>
                <div className="my-4  mx-auto text-center text-info text-lg">
                    <textarea name="comment" placeholder='Write your comment here..'
                        className='textarea textarea-secondary
                  textarea-bordered ' id="comment"
                        rows="5" style={{ width: "50%" }} required></textarea>
                    <button type='submit' className="btn btn-info  my-2 block mx-auto text-white" style={{ width: "50%" }}>Send comment</button>
                </div>
            </form>
            <h2 className='text-center my-14 text-3xl font-extrabold'> Total <span className='text-info'>{comments?.length}</span> comments found !!  </h2>
            {
                commentsLoad ? <Skeleton></Skeleton> : <div className="comment">
                    {
                        comments.map(comment =>
                            <div key={comment._id} className="border p-3  rounded-2xl my-5 mx-auto" style={{ width: "50%" }}>
                                <img src={comment?.profile ? comment?.profile : "https://i.ibb.co/RSCmwXf/imagenot.jpg"} alt="profile" className='w-12 h-12 mx-auto my-4 rounded-full' />
                                <p className='text-info'>  {comment?.comment ? comment?.comment : "comment not found"} </p>
                                <p className='text-info text-md mt-2'> Post time: {comment?.time ? comment?.time : "00/00/00"} </p>
                                <p className='text-info text-md mt-2'>Post date: {comment?.date ? comment?.date : "00/00/00"} </p>

                            </div>
                        )
                    }
                </div>
            }
        </>
    );
};

export default PostDetails;