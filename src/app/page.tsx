'use client'
import Image from "next/image";

import { CiSearch } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { useEffect, useState } from "react";
import usePost from "@/hooks/usePost";
import moment from "moment";
import Link from "next/link";


interface Data {
  results: any[]; 
}

interface Data {
  created: string; 
}

export default function Home() {


  const {PostMethod , loading  } = usePost()
  const [page , setPage] = useState(1)
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState<Data[]>([]);
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [filterOption, setFilterOption] = useState('');

  


   

  // Function to get Data
  const getData = async()=> {
    const data:any  =  await  PostMethod({
      method:'get',
        url: `job_api/?page=${page}`})

       
        if(data)
        {     setData(prevState => ([...prevState, ...data?.data?.results]));
          setFilteredData(prevState => ([...prevState, ...data?.data?.results]))

        }
  }
    useEffect(()=>{
    
         getData()

    },[page])


      // Function to handle keyword input
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
     
      
    
    };
   // Function to handle filtering based on keyboard
    useEffect(()=>{
      const filtered = data.filter((item:any) => item.title.toLowerCase().includes(keyword.toLowerCase()));
      setFilteredData(filtered);
    },[keyword])

 


  
    // Function to handle filtering based on newest/oldest
    const filterDataByOption = () => {
      const sortedData = [...data];
     
      if (filterOption === 'newest') {
        sortedData.sort((a: any, b: any) => {
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        });
      } else {
        sortedData.sort((a: Data, b: Data) => {
          return new Date(a.created).getTime() - new Date(b.created).getTime();
        });
      }
      setFilteredData(sortedData);
    };


    useEffect(()=>{
      filterDataByOption()
    },[filterOption])

   

  // Function to handle clear filter
     const handleClear = ()=>{
  
      setKeyword('')
      setFilterOption('')
     }

  return (
      <>
     
  





  <section className="flex justify-center items-center bg-blue-100 w-full h-[300px]">
    <div className=" text-center ">
      <p className=" text-3xl font-semibold">Find Jobs</p>
      <p className=" mt-2">Home / Jobs</p>
    </div>
  </section>



  <section className="my-8 px-4 xl:px-16 2xl:px-28">
    <div className=" grid grid-cols-12">
         <div className=" hidden xl:block xl:col-span-4 h-[600px]">
          <div className=" bg-blue-50 p-4 rounded-lg h-[600px]">

            <div>
            <h4 className=" text-lg font-medium">Search by Keywords</h4>

            <div className=" relative my-3">
                  <input type="text" className=" h-[50px] w-full rounded-lg focus:outline-none ring-blue-400 ring-1 focus:ring-blue-700 pl-10" placeholder="Search / keywords" value={keyword}
          onChange={handleSearchInputChange}/>
                  <div className=" absolute top-3.5 left-2">
                  <CiSearch size={20} />
                  </div>
            </div>
            </div>

          </div>
         </div>

         <div className=" col-span-12 xl:col-span-8 md:px-5">
         <div className="xl:hidden">
            <h4 className=" text-lg font-medium">Search by Keywords</h4>

            <div className=" relative my-3">
                  <input type="text" className=" h-[50px] w-full rounded-lg focus:outline-none ring-blue-400 ring-1 focus:ring-blue-700 pl-10" placeholder="Search / keywords" value={keyword}
          onChange={handleSearchInputChange}/>
                  <div className=" absolute top-3.5 left-2">
                  <CiSearch size={20} />
                  </div>
            </div>
            </div>
  <div className="px-3  block md:flex justify-between items-center h-[150px]">
    <p className="text-sm text-center my-4 md:my-0 flex-shrink-0">Show <span className="font-medium">{filteredData?.length}</span> Jobs</p>
    <div className=" block md:flex gap-x-10 items-center">
    {( keyword.length > 0 || filterOption !== '') &&
  <button className="hidden md:block mb-3 xl:mb-0 w-full md:w-[90px] md:mt-4 px-3 py-2 text-sm text-white rounded-lg bg-red-400" onClick={handleClear}>Clear All</button>
}
      <select value={filterOption} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setFilterOption(e.target.value)} id="lastest" className="bg-blue-100 my-6 w-full md:w-48 focus:outline-none block h-[44px] rounded-md placeholder:text-xs border-0 px-4 py-2.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm leading-8 md:leading-6">
        <option  value={''}>Sort by Default</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
      {/* <select id="filter" value={perPage} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> setPerPage(+e.target.value)} className="bg-blue-100 my-6 xl:my-0 w-full md:w-48 focus:outline-none block h-[44px] rounded-md placeholder:text-xs border-0 px-4 py-2.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm leading-8 md:leading-6">
      <option value="0">All Page</option>
        <option value="5">5 per page</option>
        <option value="3">3 per page</option>
       
      </select> */}
      {( keyword.length > 0 || filterOption !== '') &&
  <button className="block md:hidden mb-3 xl:mb-0 w-full px-3 py-2 text-sm text-white rounded-lg bg-red-400" onClick={handleClear}>Clear All</button>
}
    
    </div>
  </div>
<div className=" md:mt-0">


  {filteredData.length > 0 ? (
  filteredData.map((item: any, index: number) => 
   

  {
    let postdata = moment(item?.created, "YYYY-MM-DD").fromNow();
    let maxsalary = Math.floor(item["max salary"]/1000)
    let minsalary = Math.floor(item["min salary"]/1000)
    return (
    
        <div className="my-8 px-4 py-8 rounded-lg border border-blue-100" key={index}>
      <div className="grid grid-cols-12 gap-x-5">
        <div className=" col-span-3 md:col-span-2 w-[80px] h-[50px] relative">
          <Image src={`https://learnkoods-task.onrender.com${item?.image}`} fill alt="name" className="object-contain" />
        </div>
        <div className=" col-span-9">
          <Link href={item?.url} target="_blank">
          
          <h4 className="text-sm md:text-lg font-medium">{item?.title}</h4>
          </Link>
          <ul className="flex gap-x-4 my-3">
            <li className="flex gap-x-3 items-center text-xs md:text-sm">
              <CiMail size={20} />
              {item?.company}
            </li>
            <li className="flex gap-x-3 items-center text-xs md:text-sm">
              <CiMail size={20} />
              {item?.location}
            </li>
            <li className=" hidden md:flex gap-x-3 items-center text-sm">
              <CiMail size={20} /> {postdata}
            </li>
            <li className=" hidden md:flex gap-x-3 items-center text-sm">
              <CiMail size={20} /> {minsalary}k - {maxsalary}k
            </li>
          </ul>
          <ul className="flex gap-x-5">
            <li className="text-xs md:text-sm rounded-xl px-4 md:px-6 py-1  text-blue-500 bg-blue-100">
              {item?.type || 'Private'}
            </li>
            <li className=" text-xs md:text-sm rounded-xl px-4 md:px-6 py-1 text-blue-500 bg-blue-100">
              {item?.experience}
            </li>
          </ul>
        </div>
      </div>
    </div>
  
    )
  }
   
  )
) : (
  <p className=" text-center text-sm">No Data Found</p>
)}
</div>


{filteredData.length > 0 &&
<div className=" flex gap-x-10 justify-center">
{loading ? <>
  <button  className="text-center text-blue-400 cursor-pointer" >loading....</button>
</>:
<>

<button className="text-center text-blue-400 cursor-pointer" onClick={()=>setPage((pre)=>pre+1)}>Next Page</button>
</>}
</div>
}
  
</div>




    </div>
  </section>

      
      
      </>
  );
}
