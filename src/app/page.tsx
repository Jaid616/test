'use client'
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { useEffect, useState } from "react";
import usePost from "@/hooks/usePost";
import Popup from "@/components/Popup";
import useAutoClose from "@/hooks/useAutoClose";

interface Data {
  results: any[]; 
}

interface Data {
  created_at: string; 
}

export default function Home() {


  const {PostMethod , loading  } = usePost()
  const [page , setPage] = useState(1)
  const [keyword, setKeyword] = useState('');
  // const [perPage, setPerPage] = useState(0); 
  const [data, setData] = useState<Data[]>([]);
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [filterOption, setFilterOption] = useState('');

   const {closepopup , ref , tooglepopup , showPopup} = useAutoClose()


   


  const getData = async()=> {
    const data  =  await  PostMethod({
      method:'get',
        url: `jobs_api/?page=${page}`})

        setData(prevState => ([...prevState, ...data?.results]));
        setFilteredData(prevState => ([...prevState, ...data?.results]))
  }

    useEffect(()=>{
    
         getData()

    },[page])

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
     
      
    
    };

    useEffect(()=>{
      const filtered = data.filter((item:any) => item.job_title.toLowerCase().includes(keyword.toLowerCase()));
      setFilteredData(filtered);
    },[keyword])

 


  
    // Function to handle filtering based on newest/oldest
    const filterDataByOption = () => {
      const sortedData = [...data];
      if (filterOption === 'newest') {
        sortedData.sort((a: Data, b: Data) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
      } else {
        sortedData.sort((a: Data, b: Data) => {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        });
      }
      setFilteredData(sortedData);
    };


    useEffect(()=>{
      filterDataByOption()
    },[filterOption])

    //  // Function to handle filtering based on per page
    //  const perPageFilter = ()=> {

    //   const sortedData = [...data];
    //   let newdata ;
    //     if(perPage ===0)
    //     {
    //      newdata = sortedData.slice(0,5)
    //     }
    //     else {
    //       newdata = sortedData.slice(0,perPage)
    //     }
    
    
    //   setFilteredData(newdata);
    //  }


    //  useEffect(()=>{
    //      perPageFilter()
    //  },[perPage])


     const handleClear = ()=>{
      // setPerPage(0)
      setKeyword('')
      setFilterOption('')
     }

  return (
      <>
     
     <div className="flex justify-between items-center px-4 md:px-10 xl:px-20 py-4 md:py-6 lg:py-8">
  <div className="flex items-center">
    <div>
      <a href="/">
        <h2 className="text-blue-700 text-lg md:text-xl lg:text-2xl">
          <strong>Learnkoods</strong>
        </h2>
      </a>
    </div>
    <nav className="hidden xl:flex items-center ml-6">
      <ul className="flex gap-x-6 items-center">
        <li>
          <a href="/">
            <span className="text-sm">Home</span>
          </a>
        </li>
        <li>
          
            <span className="text-sm">Find Jobs</span>
         
        </li>
        <li>
         
            <span className="text-sm">Employers</span>
        
        </li>
        <li>
          
            <span className="text-sm">Candidates</span>
     
        </li>
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
      <div className=" text-sm bg-blue-100 text-blue-500 rounded-md px-4 py-2 mr-2 md:mr-4 cursor-pointer" onClick={tooglepopup}>
        Login / Register
      </div>
      <div className="text-sm bg-blue-700 text-white rounded-md px-4 py-2">
        Job Post
      </div>
    </div>
  </div>


  <div className=" flex xl:hidden gap-x-5">
    <Image src={'/user.svg'} onClick={tooglepopup} height={20} width={20} alt="user" />
    <RxHamburgerMenu size={25} />
  </div>
</div>





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

         <div className=" col-span-12 xl:col-span-8 px-5">
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
  filteredData.map((item: any, index: number) => (
    <div className="my-8 px-4 py-8 rounded-lg border border-blue-100" key={index}>
      <div className="grid grid-cols-12 gap-x-5">
        <div className=" col-span-3 md:col-span-2 w-[80px] h-[50px] relative">
          <Image src={`/mm.webp`} fill alt="name" className="object-contain" />
        </div>
        <div className=" col-span-9">
          <h4 className="text-sm md:text-lg font-medium">{item?.job_title}</h4>
          <ul className="flex gap-x-4 my-3">
            <li className="flex gap-x-3 items-center text-xs md:text-sm">
              <CiMail size={20} />
              Segment
            </li>
            <li className="flex gap-x-3 items-center text-xs md:text-sm">
              <CiMail size={20} />
              {item?.location}
            </li>
            <li className=" hidden md:flex gap-x-3 items-center text-sm">
              <CiMail size={20} /> 11 hours ago
            </li>
            <li className=" hidden md:flex gap-x-3 items-center text-sm">
              <CiMail size={20} /> $35k - $45k
            </li>
          </ul>
          <ul className="flex gap-x-5">
            <li className="text-sm rounded-xl px-6 py-1 text-blue-500 bg-blue-100">
              {item?.job_type || 'Private'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  ))
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

<button disabled = {page===1} className="text-center text-blue-400 cursor-pointer" onClick={()=>setPage((pre)=>pre-1)}>Pervious Page</button>
<button className="text-center text-blue-400 cursor-pointer" onClick={()=>setPage((pre)=>pre+1)}>Next Page</button>
</>}
</div>
}
  
</div>




    </div>
  </section>
{showPopup &&
<Popup cref ={ref} cclosepop = {closepopup}/> }
      
      
      </>
  );
}
