'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import styled from 'styled-components';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const Page = ({ params }) => {
  const [api, setApi] = useState([]);
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
  }, [url, api]); // Add 'url' to the dependency array

  return (
    <div className='overflow-y-scroll overflow-x-hidden pl-16 h-screen bg-black'>
      <Head>
        <title>Result for {params.slug}</title>
      </Head>
      <Navbar />
      <div className='text-white-400  w-[99vw]   text-orange-400 '>
        <div>
          <span className='ml-10 pt-10 text-3xl font-bold text-orange-400'>
            Search result for {params.slug}
          </span>
        </div>
        <div className='flex flex-wrap items-center'>
          {api &&
            api.map((item, i) => (
              <Link
                key={i}
                href={`/detail/${item.id}`}
                className='m-3  h-80 w-[13rem] flex items-center justify-center flex-col'
              >
                <Image width={150} height={240} src={item.image} alt='' />
                <p>{item.title}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
