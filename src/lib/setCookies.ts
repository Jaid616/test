'use server'
 
import { cookies } from 'next/headers'
 
export default async function createCookies(data:string , name:string) {

  // or
  cookies().set({
    name: `${name}`,
    expires: new Date(Date.now() + 60 * 15 * 1000),
    value: data,
    httpOnly: true,
    path: '/',
  })
}