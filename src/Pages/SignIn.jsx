import React from 'react'
import { useState } from 'react'
function SignIn() {
  const [data,setData] = useState({
   email:'',
   password:''
  });
  const {email,password} = data;

  function handleChange(e){
  setData((prevState)  => (  {  
    ...prevState,
    [e.target.id] : e.target.value,
   } ))

  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold' >Sign-In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx=auto' >
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 '>
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fi=crop&w=700&q=60" alt="key" className='w-full rounded-2xl'  />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20 '>
          <form >
            <input type="text"  id="email" value={email} placeholder='Enter Email Address' onChange={handleChange}  className='w-full px-4 py=2 text-xl text-gray-700 bf-while border-gray-300 rounded transition ease-in-out mb-6' />


            <input type="password"  id="password" value={password} placeholder='Enter Password' onChange={handleChange} className='w-full px-4 py=2 text-xl text-gray-700 bf-while border-gray-300 rounded transition ease-in-out mb-6'/>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignIn