'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Loading from "@/app/loading";

const isLocalStorageAvailable = () => {
  try {
    const testKey = "__testKey__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};


const Page = ({ params }) => {
  const [api, setApi] = useState(null);
  const [api2, setApi2] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ep, setEp] = useState();
  const [st,setSt] = useState(1)

  const url = `https://api.consumet.org/anime/gogoanime/servers/${params.slug}-episode-${ep}`;
  const url2 = `https://api.consumet.org/anime/gogoanime/info/${params.slug}`;

  

  useEffect(() => {
    // Check if localStorage is available before using it
    if (isLocalStorageAvailable()) {
      // Retrieve the last watched episode from local storage on the client side
      const lastWatchedEpisode = localStorage.getItem(`lastWatchedEpisode-${params.slug}`) || 1;
      const lastStreamed = localStorage.getItem("lastStreamed") || 1;
      setEp(parseInt(lastWatchedEpisode));
      setSt(parseInt(lastStreamed));
    }
  }, []);

  
  const handleClick2 = (e) =>{
    const elementId = parseInt(e.target.id) 
    setSt(elementId)
    if (isLocalStorageAvailable()) {
      localStorage.setItem("lastStreamed", elementId);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setIsLoading(true)
        setApi(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [ep]);
  const handleClick = (e) => {
    const elementId = parseInt(e.target.id) + 1;
    setEp(elementId);
    if (isLocalStorageAvailable()) {
      localStorage.setItem(`lastWatchedEpisode-${params.slug}`, elementId);
    }


  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url2);
        setIsLoading(true);
        setApi2(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen bg-black text-white w-screen  overflow-hidden  ">
      <Navbar />
      <h1 className="ml-10 font-bold text-3xl mt-6 text-orange-400">
        {api2?.title} episode {ep}
      </h1>
      <div className="flex justify-around mt-10 overflow-hidden">
        <iframe
          src={api && api[st]?.url}
          className="h-[62vh] w-[50vw] ml-14 overflow-hidden"
          height="auto"
          allowFullScreen
          allow="encrypted-media"
        ></iframe>
        <div className="h-[62vh] w-[30vw] overflow-y-scroll flex flex-wrap">
          {api2?.episodes.map((item, i) => (
            <p
              key={i}
              className="h-6 w-10 flex justify-center cursor-pointer rounded-md items-center border-white border-[1px] bg-black text-orange-400 m-1"
              id={i}
              onClick={handleClick}
            >
              {item.number}
            </p>
          ))}
        </div>
        
      </div>
      <div className="flex gap-7 mt-7  justify-center">
      {api && api.map((item,i)=> (
       <div key={i} >
        <h1 id={i} className='cursor-pointer border-white border-[1px] hover:pr-7 p-[0.3rem] text-orange-400' onClick={handleClick2} >{item.name}</h1>
       </div>
      ))}
     </div>
    </div>
  );
};

export default Page;
