'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import mainimg from "../public/mainimg.png";
import Cards from "@/components/Cards";

const Home = () => {
  const [api, setApi] = useState([]);
  const [data, setdata] = useState("");
  const [number, setNumber] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);

  const url = `https://api.consumet.org/anime/gogoanime/${data}?page=${number}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        if (res.status === 200) {
          setApi(res.data.results);
        } else {
          console.error("Error: Invalid response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  const handleClick = () => {
    window.location.href = "/home";
  };

  return (
    <main className="w-screen h-screen bg-black text-white overflow-hidden">
      <div className="h-[20vh] pt-7">
        <h1 className="font-bold text-orange-400 flex justify-center text-3xl">
          Insane anime
        </h1>
        <ul className="flex gap-4 justify-center pt-4">
          <Link href="/home" className="text-blue-300 hover:text-orange-400">
            Home
          </Link>
          <Link href="/home" className="text-blue-300 hover:text-orange-400">
            Trending
          </Link>
          <Link href="/home" className="text-blue-300 hover:text-orange-400">
            New Release
          </Link>
          <Link href="/home" className="text-blue-300 hover:text-orange-400">
            Recent Update
          </Link>
        </ul>
      </div>
      <div className="flex justify-center items-center">
         <Image src={mainimg} height={150} width={150}/>
       </div>
      <div className="pt-8 flex justify-center align-middle">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Anime"
            className="py-3 h-auto w-[100%] rounded-xl pl-10 text-xl text-black border-orange-400"
            value={data}
            onChange={(e) => {
              setdata(e.target.value);
              setShowDropdown(e.target.value !== "");
            }}
          />
          {showDropdown && api && api.length > 0 && (
            <ul className="absolute z-10 top-full left-0 border bg-black border-gray-300 rounded-xl w-[100%] mt-2">
              {api.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-200 hover:text-black"
                >
                  <Link href={`detail/${item.id}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center mt-auto">
        <p className="text-gray-400 mb-4 mx-44 pt-10 max-sm:mx-1">
          Discover the world of anime at Insane Anime. Stream your favorite series, explore new releases, and immerse yourself in captivating stories. Join our vibrant community of anime enthusiasts and experience the magic of animation. Start your anime journey today!
        </p>
        <Link href={'/home'} className="bg-orange-400 w-[80%] px-6 py-3 align-middle justify-center flex mt-11 rounded-xl">
          View Full Site
        </Link>
      </div>
    </main>
  );
}

export default Home;
