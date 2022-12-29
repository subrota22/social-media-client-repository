import React from 'react';
import { createContext } from 'react';
import {
    createUserWithEmailAndPassword, getAuth,
    GithubAuthProvider, GoogleAuthProvider,
    onAuthStateChanged,
    sendEmailVerification, sendPasswordResetEmail,
    signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,

}
    from "firebase/auth";
import app from '../firebase.config/firebase.config';
import { useState } from 'react';
export const AuthProvider = createContext();
const auth = getAuth(app);
const UserContext = ({ children }) => {
    //user data set 
    const [user , setUserData] = useState({}) ;
    //social auth provider
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    //create new user 
    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    //send email verification
    const sendEmailVerify = () => {
        return sendEmailVerification(auth.currentUser);
    }
    //login user
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    //login with google
    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    //login with github
    const loginWithGitHub = () => {
        return signInWithPopup(auth, githubProvider);
    }
    //reset password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }
    //user data 
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth , (userInfo) => {
    if(userInfo) {
        setUserData(userInfo) ;
    }
    return () => unsubscribe () ;
    })
  }, []);

  //sign out user
  const signOutUser = () => {
  return signOut(auth) ;
  }
  //update user
  const updateUser = (name , profile) => {
  return updateProfile(auth.currentUser, {
    displayName:name , 
    photoURL:profile , 
  })
  }
    //share data with different components
    const authInfo = {
        createNewUser, sendEmailVerify, loginUser, loginWithGoogle,
        loginWithGitHub, resetPassword , user , signOutUser , setUserData ,
        updateUser
    };
    return (
        <>
            <AuthProvider.Provider value={authInfo}>
                {children}
            </AuthProvider.Provider>
        </>
    );
};

export default UserContext;