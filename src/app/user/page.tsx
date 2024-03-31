import LogoutButton from "@/components/LogoutButton"
import getData from "@/lib/getData"


const ProfilePage = async() => {

    const profileData = await getData('user_data/')

        
  return (
   <>
   <section className="flex justify-center items-center bg-blue-100 w-full h-[300px]">
    <div className=" text-center ">
      <p className=" text-3xl font-semibold">Profile</p>
      <p className=" mt-2">Home / Profile</p>
    </div>
  </section>

  <div className="grid grid-cols-1 mt-5 md:mt-12 md:grid-cols-2 gap-5 md:gap-12 w-3/4  m-auto">
  <div >
            <label
              htmlFor={'username'}
              className="block text-sm font-medium leading-6 text-black"
            >
              {'Username'}
            </label>
            <div className="mt-2 relative">
              <input
                id='username'
           
               
                type='text'
                autoComplete="none"
                disabled
                value={profileData?.data?.username}
              
                className={`focus:outline-none block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-primary  text-sm leading-8 md:leading-6 }`}
              />
              </div>
  </div>

  <div >
            <label
              htmlFor={'emali'}
              className="block text-sm font-medium leading-6 text-black"
            >
              {'Email'}
            </label>
            <div className="mt-2 relative">
              <input
                id='email'
           
                 disabled
                 value={profileData?.data?.email}
                type='text'
                autoComplete="none"
              
                className={`focus:outline-none block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-primary  text-sm leading-8 md:leading-6 }`}
              />
              </div>
  </div>

  <div >
            <label
              htmlFor={'firstname'}
              className="block text-sm font-medium leading-6 text-black"
            >
              {'First Name'}
            </label>
            <div className="mt-2 relative">
              <input
                id='firstname'
           
                disabled
                type='text'
                autoComplete="none"
                 value={profileData?.data?.first_name}
              
                className={`focus:outline-none block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-primary  text-sm leading-8 md:leading-6 }`}
              />
              </div>
  </div>

  <div >
            <label
              htmlFor={'lname'}
              className="block text-sm font-medium leading-6 text-black"
            >
              {'Last Name'}
            </label>
            <div className="mt-2 relative">
              <input
                id='lname'
           
                disabled
                value={profileData?.data?.last_name}
                type='text'
                autoComplete="none"
       
              
                className={`focus:outline-none block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-primary  text-sm leading-8 md:leading-6 }`}
              />
              </div>
  </div>

  <LogoutButton/>
  </div>
  
   </>
  )
}

export default ProfilePage
