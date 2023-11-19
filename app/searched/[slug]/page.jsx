'use client'
import Link from 'next/link';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Head from 'next/head';
import styled from 'styled-components';
import Navbar from '@/components/Navbar';

const page = ({ params}) => {
    const [api, setApi] = useState(null);
    const url = `https://api.consumet.org/anime/gogoanime/${params.slug}`;
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(url);
            if (res.status === 200) {
              setApi(res.data.results);

             console.log(api);
            } else {
              console.error('Error: Invalid response');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
          
        };
    
        fetchData();
      }, [url]);
      
  return (
   <div className='overflow-hidden pl-16 h-screen bg-black'>
    <Head>
      <title>Result for {params.slug}</title>
    </Head>
   <Navbar/>
   <div className='text-white-400 overflow-hidden w-[99vw]   text-orange-400 '>
      <div  >
        <span className='ml-10 pt-10 text-3xl font-bold text-orange-400'>Search result for {params.slug}</span> 
    
      </div>
      <div className='flex flex-wrap items-center' >
        {api && api.map((item, i) => (
          <Link
            key={i}
            href={
              `/detail/${item.id}`
            }
            className='m-3  h-80 w-[13rem] flex items-center justify-center flex-col'
            
          >
            <img className='h-60 w-50' src={item.image} alt="" />
            <p>
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
   </div>
  );
};



export default page;