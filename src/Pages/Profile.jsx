import React,{useState} from 'react'
import { auth,db } from '../firebase';
import { useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';


function Profile() {
const [formData, setFormData] = useState({
  name: 'profile',
  email: 'ychag@example.com',
});
const {name,email} = formData;
const [changeDetails, setChangeDetails] = useState(false);
const navigate = useNavigate();
const onChange = (e) =>{
  setFormData((prevStatus)=>({
    ...prevStatus,
    [e.target.id]:e.target.value
  }))
}

  const onLogOut = ()=>{
      auth.signOut();
      navigate('/')
  }

  const onsubmit = async ()=>{
    try {
        if(auth.currentUser.displayName!==name){
          await updateProfile(auth.currentUser, {
              displayName: name,
          });

          const docRef = doc(db, 'users', auth.currentUser.uid);
          await updateDoc(docRef,{
            name,
          });
          toast.success('Profile Updated Successfully');

        }
    } catch (error) {
        toast.error("coundn't update profile");
    }
  }

  return (
   <>
   <section className='max-w-6xl mx-auto flex justify-center items-center flex-col '>
   <h1 className='text-3xl text-center mt-6 font-bold' > MY Profile </h1>
   <div className=' w-full md:w-[50%] mt-6 px-3  '>
    <form >
      <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6' type="text" value={name}  id="name" disabled={!changeDetails} onChange={onChange} />

      <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6' type="email" value={email} id="email" disabled={!changeDetails} onChange={onChange} />

      <div className=" flex justify-between whitespace-nowrap text-5m sm:text-lg mb-6 ">
        <p className='flex items-center ' > Do you want to change your name? <span className=' text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'  onClick={()=>{changeDetails && onsubmit();
        setChangeDetails((prevStatus)=>!prevStatus) }}>{changeDetails?"Apply change" : "Edit"} </span> </p>
        <p className='text-blue-600 hover:text-blue-800 transition-duration-200 ease-in-out cursor-pointer' onClick={onLogOut} >Sign Out</p>
      </div>
    </form>
   </div>
   </section>
   </>
  )
}

export default Profile