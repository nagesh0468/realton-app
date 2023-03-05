import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import { Link,useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';
import { auth } from '../firebase';

import {toast} from 'react-toastify';


function SignIn() {
  const [showPassword,setShowPassword] = useState(false)
  const [formdata, setFormData] = useState({
  email: '',
  password: '',
  });
  const { email, password } = formdata;
  const navigate = useNavigate();
  const onChange = (e) =>{
    setFormData((prevState) =>({
      ...prevState,
      [e.target.id]:e.target.value,
    }))
  }

  const onSubmit = (async (e)=>{
    e.preventDefault();
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          if(userCredential.user){
            navigate('/');
          }
          toast.success('Login successful');
        } catch (error) {
          toast.error('bad user credentials');
        }
  })


  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold' >Sign-In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx=auto' >
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 '>
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fi=crop&w=700&q=60" alt="key" className='w-full rounded-2xl'  />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20 '>
          <form onSubmit={onSubmit} >
            <input type="text"  id="email" value={email} placeholder='Enter Email Address'  className='w-full px-4 py=2 text-xl text-gray-700 bf-while border-gray-300 rounded transition ease-in-out mb-6' onChange={onChange} />
           
            <div className="relative">
            <input type={showPassword?"text":"password"}  id="password" value={password} placeholder='Enter Password' className='w-full px-4 py=2 text-xl text-gray-700 bf-while border-gray-300 rounded transition ease-in-out mb-6' onChange={onChange} />


             {showPassword?<AiFillEyeInvisible onClick={() => setShowPassword((prevState)=>!prevState)} className="absolute right-3 top-3 text-xl cursor-pointer" />:<AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState)=>!prevState)} />}

          </div>

          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg ' >
            <p> Don't have account? <Link to='/sign-up' className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'> Register </Link> </p>

            <p> <Link to='/forgot-password' className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'> Forgot-Password</Link> </p>

          </div>

          <button type="submit" className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition-duration-700 ease-in-out hover:shadow-lg active:bg-blue-800 mt-4 ' >Sign-In</button>
            
            <div className='my-4 flex items-center  before:border before:flex-1 before:border-gray-300  after:border after:flex-1 after:border-gray-300 ' >
              <p className='text-center font-semibold mx-2' >OR</p>
            </div>

            <OAuth/>

          </form>
        </div>
      </div>
    </section>
  )
}

export default SignIn