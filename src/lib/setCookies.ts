'use server'
 
import { cookies } from 'next/headers'
 
//Create httponly cookies on server side
export default async function createCookies(data:string , name:string) {


  cookies().set({
    name: `${name}`,
    expires: new Date(Date.now() + 60 * 15 * 1000),
    value: data,
    httpOnly: true,
    path: '/',
  })
}


// Delete httpOnly cookies on server side
export  async function deleteCookies(name:string) {
  const cookieStore = cookies()
  const token = cookieStore.get(`${name}`)


   if(token?.value)
   {
     cookies().delete(`${name}`)
   }
}