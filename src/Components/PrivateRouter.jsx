import React from 'react'
import { useAuthStatus } from '../hook/useAuthStatus'
import {Outlet,Navigate} from 'react-router-dom'
// import Spinner from "./Spinner";
export default function PrivateRouter() {
    const {isLoggedIn,checking} = useAuthStatus();
   if(checking){
    return<h1>Loading</h1>

   }

  return isLoggedIn?<Outlet/> : <Navigate to='/sign-in' />
}
