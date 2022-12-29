import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthProvider } from '../UserContext/UserContext';

const PrivateRouter = ({children}) => {
    const {user} = useContext(AuthProvider) ;
   if(user?.uid){
   return children ;
   }
   return <Navigate to="/login"></Navigate>
};

export default PrivateRouter;