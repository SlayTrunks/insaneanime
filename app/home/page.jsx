'use client'
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Link from 'next/link';
import {AiOutlineRight,AiOutlineLeft} from 'react-icons/ai'
import Cards from '@/components/Cards';
import Navbar from '@/components/Navbar';
import Topairing from '@/components/Topairing';

const Page = () => {
  const value = ['naruto','one-piece','dragon-ball','bleach','haikyuu']
  const [api, setApi] = useState(null);
  const [single,setSingle] = useState(null);
  const [number,setNumber] = useState(0)
 
  const url2 = `https://api.consumet.org/anime/gogoanime/info/${value[+number]}`
 
  
 const handlenext = ()=>{
  if(number < 4){
    setNumber(number+1)
  }if(number === 4){
    setNumber(0)
  }
 }
 const handleprev = ()=>{
  if(number < 4){
    setNumber(number-1)
  }if(number === 0){
    setNumber(4)
  }
 }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url2);
        if (res.status === 200) {
          setSingle(res.data);
         
        } else {
          console.error('Error: Invalid response');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url2]);

  return (
   <div className='bg-black text-orange-400'>
    <Navbar/>
      {single && <div className='h-[70vh] bg-black overflow-x-hidden text-white'>
        
        <div className="h-[60vh] w-screen flex justify-around items-center">
        <button onClick={handleprev}><AiOutlineLeft/></button>
          <div className='w-[40vw] '>
          <h1 className='font-bold text-2xl flex flex-wrap text-orange-400 mt-7'>{single.title}</h1>
          <p className='text-gray-400 text-sm mb-8 mt-6'>{single.description}</p>
          <Link href={`/detail/${single.id}`} className='bg-orange-400 text-black py-3 px-3 rounded-xl '>See more</Link>
          </div>
          <img src={single.image} alt={single.title} className=' pt-16 h-96 w-96' />
          <button onClick={handlenext}><AiOutlineRight/></button>
        </div>
      </div>}
      <Topairing/>
     <Cards/>
   </div>
)}

export default Page;
