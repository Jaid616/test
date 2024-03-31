'use client'
import { deleteCookies } from '@/lib/setCookies'
import { useLoggedIn } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import React from 'react'

const LogoutButton = () => {
    const { logout  }  =useLoggedIn()
   const router =  useRouter()
    const handleLogout = async()=> {


       await deleteCookies('access_token')
        logout(false)
        router.push('/')
        
    }
  return (
    <button className=" text-sm w-[100px] mb-28  bg-blue-100 text-blue-500 rounded-lg px-6 py-2 mr-2 md:mr-4 cursor-pointer"
       onClick={handleLogout}
      >
            Logout
          </button>
  )
}

export default LogoutButton
