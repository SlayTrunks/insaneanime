'use client'
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Loading from "@/app/loading";


const page = ({params}) => {
  const [api, setApi] = useState(null);
  const [api2,setApi2] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [ep, setEp ] = useState(1)

  
  const url = `https://api.consumet.org/anime/gogoanime/servers/${params.slug}-episode-${ep}`
  const url2 = `https://api.consumet.org/anime/gogoanime/info/${params.slug}`;

  const handleClick = (e) =>{
    const elementId = parseInt(e.target.id) + 1
   
    console.log(elementId)
    setEp(elementId)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setApi(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [ep]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url2);
        setIsLoading(true)
        setApi2(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [ep]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className=" h-screen bg-black text-white w-screen relative ">
    <Navbar/>
    <h1 className="ml-10 font-bold text-3xl mt-6 text-orange-400">{api2 && api2.title} episode {ep}</h1>
    <div className="flex justify-around mt-10  overflow-hidden">
    <iframe src={api && api[2].url} className={`h-[62vh] w-[50vw] ml-14`} height='auto' allowFullScreen  allow="encrypted-media"></iframe>
    <div className="h-[62vh] w-[30vw] overflow-y-scroll flex flex-wrap  ">
      {api2 && api2.episodes.map((item,i)=>(
        <p className="h-6  w-10 flex justify-center cursor-pointer rounded-md items-center border-white border-[1px] bg-black text-orange-400 m-1"  id={i} onClick={handleClick} >{item.number}</p>
      )

      )}
    </div>
    </div>
    {/* <iframe src={api?.headers.Referer} className="" allowFullScreen height='100vh'  ></iframe> */}
    
   
</div>
  )
}

export default page


