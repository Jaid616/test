'use client'
import useAutoClose from '@/hooks/useAutoClose'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Popup from "@/components/Popup";
import { RxHamburgerMenu } from "react-icons/rx";
import { useLoggedIn } from '@/store/useAuthStore';
import { deleteCookies } from '@/lib/setCookies';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const HeaderCom = ({loginStatus}:{loginStatus:boolean}) => {
      const { logout , auth , login  }  =useLoggedIn()
    const {closepopup , ref , tooglepopup , showPopup} = useAutoClose()
    const router =  useRouter()
    const handleLogout = async()=> {

       await deleteCookies('access_token')
        logout(false)
        router.push('/')
    }

   useEffect(()=> {
       login(loginStatus)
   },[loginStatus])

  return (
   <>
      <div className="flex justify-between items-center px-4 md:px-10 xl:px-20 py-4 md:py-6 lg:py-8">
  <div className="flex items-center">
    <div>
      <Link href="/">
        <h2 className="text-blue-700 text-lg md:text-xl lg:text-2xl">
          <strong>Learnkoods</strong>
        </h2>
      </Link>
    </div>
    <nav className="hidden xl:flex items-center ml-6">
      <ul className="flex gap-x-6 items-center">
        <li>
          <Link href="/">
            <span className="text-sm">Home</span>
          </Link>
        </li>

        {auth && 
        <Link href={'/user'}>

        <li>
          
            <span className="text-sm">Profile</span>
         
        </li>
        </Link> }
      
     
        <li>
         
            <span className="text-sm">Blog</span>
         
        </li>
        <li>
         
            <span className="text-sm">About Us</span>
      
        </li>
      </ul>
    </nav>
  </div>
  <div className=" hidden xl:flex items-center">
    <div
      className="text-sm text-blue-500 mr-4 md:mr-6"
     
    >
      Upload your CV
    </div>
    <div className="flex items-center">
        {auth ?     <div className=" text-sm bg-blue-100 text-blue-500 rounded-md px-4 py-2 mr-2 md:mr-4 cursor-pointer" onClick={handleLogout}>
        Logout
      </div> :     <div className=" text-sm bg-blue-100 text-blue-500 rounded-md px-4 py-2 mr-2 md:mr-4 cursor-pointer" onClick={tooglepopup}>
        Login / Register
      </div> }
  
      <div className="text-sm bg-blue-700 text-white rounded-md px-4 py-2">
        Job Post
      </div>
    </div>
  </div>


  <div className=" flex xl:hidden gap-x-5">
    {auth ? 
    <Link  href={'/user'}>
    <Image src={'/user.svg'} height={20} width={20} alt="user" /> 
    </Link>
    :
    <Image src={'/user.svg'} onClick={tooglepopup} height={20} width={20} alt="user" />
    }
    
    <RxHamburgerMenu size={25} />
  </div>
</div>
{showPopup &&
<Popup cref ={ref} cclosepop = {closepopup}/> }
   </>
  )
}

export default HeaderCom
