import { cookies } from "next/headers";

//Fetch Data in Server side 
const getData = async(url:string) => {

  const cookieStore = cookies()
  const token = cookieStore.get('access_token')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}` ,  {
        headers: { Authorization: `Bearer ${token?.value}` },
      })
    const data = await response.json()

    return data ;
    } catch (error) {
      return error
    }
  
}

export default getData
