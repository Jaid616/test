'use client'
import useAutoClose from '@/hooks/useAutoClose';
import usePost from '@/hooks/usePost';
import createCookies from '@/lib/setCookies';
import Image from 'next/image'
import React, { useState } from 'react'
import { CiMail } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";



const Popup = ({cref , cclosepop}:{cref:any , cclosepop :any}) => {


const [status , setStatus] = useState(false)

 const {PostMethod , loading} = usePost()


const [loginData , setLoginData] = useState({
    username : '',
    password :''
})

const [regsterData , setregsterData] = useState({
    first_name:'',
    last_name:'',
    email:'',
    username : '',
    password :''
})



const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

const handleChangeRegister = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setregsterData(prevState => ({
        ...prevState,
        [name]: value
    }));
};


const handleLogin = async(e:any)=> {
    e.preventDefault();
        let response =  await  PostMethod({
            method:'post',
            body: loginData,
            url : 'login_api/'
         }) 
       if(response?.status === 200)
       {
         createCookies(response?.data?.data.access , "access_token")
         cclosepop()
       }
       else{
          alert(response?.data.error)
       }
}


const handleSignup = async(e:any)=> {
    e.preventDefault();
  let response =  await  PostMethod({
        method:'post',
        body: regsterData,
        url : 'user_api/'
     })
     console.log(response , "response")
     if(response?.status ===200 )
     {
       
     }
     else {
      let error =''
      if(response?.data?.message?.username)
      {
        error = response?.data?.message?.username[0]
      }
      else{
       error = response?.data.message
      }
      alert(error)
     }


    //  cclosepop()
}

  return (
    <div className=' top-0 left-0 absolute z-40  w-[100%] h-screen bg-[rgba(0,0,0,0.61)]'>
        

        <div ref={cref} className=' w-[360px] md:w-[500px] rounded-lg  xl:my-12 my-6 bg-white m-auto px-5 py-5'>
            <div className=' flex justify-end'>
                <IoMdClose size={20} onClick={cclosepop}/>
            </div>

            <div className=' flex justify-center'>
                <p className='text-2xl font-semibold'>Login to Superio</p>
            </div>

           

            {status ? 
            <form className=' px-4 md:px-10' onSubmit={handleSignup}>
<div>
            <label
              htmlFor={'username'}
              className="block mt-4 text-sm font-medium leading-6 text-black"
            >
              {'Username'}
            </label>
            <div className="mt-2 relative">
              <input
                id='username'
                name='username'
                value={regsterData.username}
                onChange={(e)=>handleChangeRegister(e)}
           
           
                type='text'
                autoComplete="none"
                placeholder="Enter you User Name"
                required
              
                className={`focus:outline-none block w-full bg-gray-100 rounded-md h-[35px] md:h-[50px] placeholder:text-xs border-0 p-2 shadow-sm ring-0 focus:ring-1 focus:ring-blue-300 focus:bg-white text-sm leading-8 md:leading-6 `}
              />
              </div>
              </div>
              <div>
            <label
              htmlFor={'fname'}
              className="block mt-4 text-sm font-medium leading-6 text-black"
            >
              {'First Name'}
            </label>
            <div className="mt-2 relative">
              <input
                id='fname'
                name='first_name'
                value={regsterData.first_name}
                onChange={(e)=>handleChangeRegister(e)}
           
                type='text'
                autoComplete="none"
                placeholder="Enter you First Address"
                required
              
                className={`focus:outline-none block w-full bg-gray-100 rounded-md h-[35px] md:h-[50px] placeholder:text-xs border-0 p-2 shadow-sm ring-0 focus:ring-1 focus:ring-blue-300 focus:bg-white text-sm leading-8 md:leading-6 `}
              />
              </div>
              </div>
              <div>
            <label
              htmlFor={'lname'}
              className="block mt-4 text-sm font-medium leading-6 text-black"
            >
              {'Last Name'}
            </label>
            <div className="mt-2 relative">
              <input
                id='lname'
                name='last_name'
              value={regsterData.last_name}
             onChange={(e)=>handleChangeRegister(e)}
                type='text'
                autoComplete="none"
                placeholder="Enter you  Last Name"
                required
              
                className={`focus:outline-none block w-full bg-gray-100 rounded-md h-[35px] md:h-[50px] placeholder:text-xs border-0 p-2 shadow-sm ring-0 focus:ring-1 focus:ring-blue-300 focus:bg-white text-sm leading-8 md:leading-6 `}
              />
              </div>
              </div>
            <div>
            <label
              htmlFor={'email'}
              className="block mt-4 text-sm font-medium leading-6 text-black"
            >
              {'Email'}
            </label>
            <div className="mt-2 relative">
              <input
                id='email'
                name='email'
                value={regsterData.email}
                onChange={handleChangeRegister}
           
           
                type='email'
                autoComplete="none"
                placeholder="Enter you Email Address"
                required
              
                className={`focus:outline-none block w-full bg-gray-100 rounded-md h-[35px] md:h-[50px] placeholder:text-xs border-0 p-2 shadow-sm ring-0 focus:ring-1 focus:ring-blue-300 focus:bg-white text-sm leading-8 md:leading-6 `}
              />
              </div>
              </div>


              <div className='mt-2'>
            <label
              htmlFor={'password'}
              className="block mt-4 text-sm font-medium leading-6 text-black"
            >
              {'Password'}
            </label>
            <div className="mt-2 relative">
              <input
                id='password'
                 value={regsterData.password}
                 name='password'
                 onChange={(e)=>handleChangeRegister(e)}
           
                type='password'
                autoComplete="none"
                placeholder="Enter you password"
                required
              
                className={`focus:outline-none block w-full bg-gray-100 rounded-md h-[35px] md:h-[50px] placeholder:text-xs border-0 p-2 shadow-sm ring-0 focus:ring-1 focus:ring-blue-300 focus:bg-white text-sm leading-8 md:leading-6 `}
              />
              </div>
              </div>


            

              <div className=' my-5'>
                <button type='submit' className='w-full py-3 bg-blue-700 text-center text-white rounded-lg'>Register</button>
              </div>
              <div>
                <p className=' text-center mb-6 text-xs cursor-pointer' onClick={()=>setStatus(false)}>Already have an account? LogIn</p>
              </div>
            </form> :
             <form className='px-4 md:px-10' onSubmit={ handleLogin}>
             <div>
             <label
               htmlFor={'username'}
               className="block mt-4 text-sm font-medium leading-6 text-black"
             >
               {'Username'}
             </label>
             <div className="mt-2 relative">
               <input
                 id='username'
                 name='username'
                 value={loginData?.username}
                 onChange={(e)=>handleChange(e)}
            
            
                 type='text'
                 autoComplete="none"
                 placeholder="Enter you Username"
                 required
               
                 className={`focus:outline-none block w-full bg-gray-100 rounded-md h-[35px] md:h-[50px] placeholder:text-xs border-0 p-2 shadow-sm ring-0 focus:ring-1 focus:ring-blue-300 focus:bg-white text-sm leading-8 md:leading-6 `}
               />
               </div>
               </div>
 
 
               <div className=' mt-10'>
             <label
               htmlFor={'password'}
               className="block mt-4 text-sm font-medium leading-6 text-black"
             >
               {'Password'}
             </label>
             <div className="mt-2 relative">
               <input
                 id='password'
                 name='password'
                 value={loginData?.password}
                 onChange={(e)=>handleChange(e)}
            
                 type='password'
                 autoComplete="none"
                 placeholder="Enter you password"
                 required
               
                 className={`focus:outline-none block w-full bg-gray-100 rounded-md h-[35px] md:h-[50px] placeholder:text-xs border-0 p-2 shadow-sm ring-0 focus:ring-1 focus:ring-blue-300 focus:bg-white text-sm leading-8 md:leading-6 `}
               />
               </div>
               </div>
 
 
               <div className=' text-sm mt-1 flex justify-between items-center'>
 
               <div className="flex items-center ">
                 <input
                   id={'remberme'}
                   type="checkbox"
                 //   value={items.label}
                 //   checked ={selectedTag?.includes(items.label)}
                 //   onChange={() => handleFilterChange(items.label, isCategory ? 'category' : 'brand')}
 
                   className="w-4 h-4 accent-primary bg-gray-100 border-gray-300 rounded"
                 />
                 <label
                   htmlFor={'remberme'}
                   className="w-full py-3 ms-2 text-xs font-medium text-gray-500"
                 >
                   {'Remember me'}
                 </label>
               </div>
                 <p className=' text-gray-500 text-xs'>Forget Password?</p>
               </div>
 
               <div className=' my-5'>
                 <button type='submit' disabled={loading} className='w-full py-3 disabled:bg-blue-300 bg-blue-700 text-center text-white rounded-lg'>Login</button>
               </div>
               <div>
                 <p className=' text-center mb-6 text-xs cursor-pointer' onClick={()=>setStatus(true)}>Don't have an account? Signup</p>
               </div>
             </form>
            }



        </div>


      
    </div>
  )
}

export default Popup
