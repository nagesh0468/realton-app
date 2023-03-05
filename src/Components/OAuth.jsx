import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {doc,getDoc,setDoc,serverTimestamp} from 'firebase/firestore';
import React from 'react'
import {FcGoogle} from 'react-icons/fc';
import {auth,db} from '../firebase';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';



function OAuth() {
        const navigate = useNavigate();

  const onGoogleClick = async () =>{
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth,provider);
      const user = result.user;

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()){
        await setDoc(docRef, {
        name: user.displayName,
        email : user.email,
        timeStamp : serverTimestamp()
        })
      }
        navigate('/');

    } catch (error) {
      toast.error("couldn't authorized with google");


    }
  }
  return (
    <button onClick={onGoogleClick} type='button' className='w-full bg-red-700 uppercase flex items-center justify-center text-white px-7 py-3  text-sm font-medium rounded hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-out'><FcGoogle className='text-2xl bg-white rounded-full mr-2' />continue with google</button>
  )
}

export default OAuth