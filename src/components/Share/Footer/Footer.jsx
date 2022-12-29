import React from 'react';
import {BsFacebook ,BsInstagram , BsGithub} from "react-icons/bs" ;
import {AiFillTwitterCircle} from "react-icons/ai" ;
const Footer = () => {
    return (
        <>
            
<footer className="p-4 bg-gray-700 text-white sm:p-6 dark:bg-gray-900">
    <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
  
                <img src="https://i.ibb.co/t24rYP0/post-Image.png" className="mr-3 h-14" alt="Post Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-info uppercase">your think </span>

        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
                <h2 className="mb-6 text-sm font-semibold text-info uppercase ">Services</h2>
                <ul className=" dark:text-gray-400">
                    <li className="mb-4">
                        React.js 
                    </li>
                    <li>
                      Node.js
                    </li>
                    <li>
                      MongoDB
                    </li>
                    <li>
                      JavaSrcipt 
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-6 text-sm font-semibold  uppercase text-info">Follow us</h2>
                <ul className="text-white dark:text-gray-400">
                    <li className="mb-4">
                        <a href='https://github.com/subrota10618' target="_blank" rel="noreferrer"  className="hover:underline ">Github</a>
                    </li>
                    <li>
                        <a href='https://www.facebook.com/subrotachandra22/' target="_blank" rel="noreferrer" className="hover:underline">Facebook</a>
                    </li>
                    <li>
                        <a href='https://twitter.com/Subrota21087778'  target="_blank" rel="noreferrer" className="hover:underline">Twitter</a>
                    </li>
                    <li>
                        <a href='https://www.instagram.com/subrotachandra12/'   target="_blank" rel="noreferrer" className="hover:underline">Instragram</a>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-info">Legal</h2>
                <ul className="text-white dark:text-gray-400">
                    <li className="mb-4">
                      Privacy Policy
                    </li>
                    <li>
                    Terms &amp; Conditions
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-white sm:text-center dark:text-gray-400"> &copy; Copy right by Subrota chandra sarker 2022.
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href='https://www.facebook.com/subrotachandra22/'  target="_blank" rel="noreferrer"  className="text-white hover:text-white dark:hover:text-white">
            <BsFacebook className='text-3xl'></BsFacebook>
            </a>
            <a href='https://www.instagram.com/subrotachandra12/'   target="_blank" rel="noreferrer" className="text-white hover:text-white dark:hover:text-white">
             <BsInstagram className='text-3xl'></BsInstagram>
            </a>
            <a href='https://twitter.com/Subrota21087778'  target="_blank" rel="noreferrer"className="text-white hover:text-white dark:hover:text-white">
         <AiFillTwitterCircle className='text-3xl'></AiFillTwitterCircle>
            </a>
            <a href='https://github.com/subrota10618' target="_blank" rel="noreferrer" className="text-white hover:text-white dark:hover:text-white">
           <BsGithub className='text-3xl'></BsGithub>
            </a>
      
        </div>
    </div>
</footer>

        </>
    );
};

export default Footer;