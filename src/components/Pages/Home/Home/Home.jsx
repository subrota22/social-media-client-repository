import React from 'react';
import { Helmet } from 'react-helmet';
import DisplayPost from '../DisplayPost/DisplayPost';
import UploadPost from '../UploadPost/UploadPost';

const Home = () => {
    return (
        <>
          <Helmet> <title> Home </title> </Helmet>  
          <UploadPost></UploadPost>
          <DisplayPost></DisplayPost>

    <div className="hero min-h-screen bg-gray-700 my-7 mx-auto rounded-lg" style={{width:"80%"}}>
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Our post site </h1>
      <p className="py-6">
      Our post site is fully secure and safe nobody can hack your information 100% suerity.So what you waiting for let's start your posting.
      </p>
  <a href="#postNow">
  <button className="btn btn-primary">Get Started</button>
  </a>
    </div>
  </div>
</div>

        </>
    );
};

export default Home;