import { onAuthStateChanged } from 'firebase/auth';
import {useState,useEffect} from 'react'
import { auth } from '../firebase';

export function useAuthStatus() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checking, setChecking] = useState(true);
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setIsLoggedIn(true);
            }
            setChecking(false);
        })
    },[])
  return {isLoggedIn,checking};
}
