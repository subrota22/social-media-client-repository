import React from 'react';
import { Helmet } from 'react-helmet';

const Contact = () => {
    return (
        <>
            <Helmet><title>Contact page </title></Helmet>
            <form action="https://formsubmit.co/subrota45278@gmail.com" method="post"
                className="mx-auto mb-5 border-2 border-info rounded-xl my-16 px-6
     bg-dark py-12 text-gray-700 "style={{ width: "50%" }} data-aos="zoom-in" data-aos-anchor-placement="center-center "
                data-aos-duration="2000">
                <h2 className='text-white text-center text-3xl font-extrabold'> Contact us </h2>
                <div className="mb-6">
                    <label for="name" className="block mb-2 text-sm font-medium text-white ">Your name</label>
                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Johan doe" required />
                </div>
                <div className="mb-3">

                    <div className="mb-6">
                        <label for="email" className="block mb-2 text-sm font-medium  text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                    </div>

                </div>

                <div className="mb-6">
                    <label for="phone_number" className="block mb-2 text-sm font-medium  text-white">Your phone number</label>
                    <input type="text" name="phone_number" id="phone_number" className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='+8801750157854' required />
                </div>


                <div className="mb-6">
                    <label for="message" className="block mb-2 text-sm font-medium text-white"> Message</label>
                    <textarea className="input input-primary  p-3" name="messge" placeholder="Your can write your message here..." id="messge" style={{ width: "100%", height: "100px" }} required></textarea>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary w-full  py-2 m-auto">Send message</button>
                </div>
            </form>
        </>
    );
};

export default Contact;