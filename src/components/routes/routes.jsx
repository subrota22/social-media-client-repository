import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../../MainLayout/MainLayout";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Media from "../Pages/Media/Media";
import PageError from "../Pages/PageError/PageError";
import PostDetails from "../Pages/PostDetails/PostDetails";
import Register from "../Pages/Register/Register";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import PrivateRouter from "../PrivateRouter/PrivateRouter";

export const routes = createBrowserRouter([
    {
        path: "/", element: <MainLayout></MainLayout>, children: [
            {
                path: "/", element: <Home></Home>
            },
            {
                path: "/media", element: <Media></Media>
            },
            {
                path: "/post-detials/:id",
                loader: ({ params }) => fetch(`https://social-media-subrota22.vercel.app/posts/${params.id}` ,{
                    headers:{
                        authentication: `Bearer ${localStorage.getItem("social-media-token")} ` ,
                       
                    }
                })
                    .then(res => {
                        if(res.status === 403 ) {
                            return <Navigate to="/login"></Navigate>
                        }else{
                            return res.json() ;
                        }
                    })
                    .then(data => data)
                , element: <PrivateRouter><PostDetails></PostDetails></PrivateRouter>
            }
            ,{
                path:"/register" , element: <Register></Register>
            } ,
            {
                path:"/login" , element: <Login></Login>
            }
            ,
            {
                path:"/reset-password" , element: <PrivateRouter><ResetPassword></ResetPassword></PrivateRouter>
            } ,
            {
                path:"/about" , element:<PrivateRouter><About></About></PrivateRouter>
            } ,
            {
                path:"/contact" , element:<PrivateRouter><Contact></Contact></PrivateRouter>
            } ,
            {
                path:"*" , element:<PageError></PageError>
            }
        ]
    }
])