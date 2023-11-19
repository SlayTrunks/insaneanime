'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../loading"; // Assuming you have a LoadingPage component
import Navbar from '@/components/Navbar'
import Link from "next/link";
export default function Page({ params }) {
  const [api, setApi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const url = `https://api.consumet.org/anime/gogoanime/info/${params.slug}`;

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
  }, [url]);

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <>
    <Navbar/>
       <div className="bg-black text-white min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative aspect-w-2 aspect-h-3 md:aspect-none">
            <img
              src={api.image}
              alt={api.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg my-12"
            />
          </div>
          <div className="flex flex-col justify-center p-6">
            <h1 className="text-3xl text-orange-400 font-semibold mb-2">{api.title}</h1>
            <div className="flex gap-8">
            <p className="text-sm opacity-80 mb-4">
              Release Date: {api.releaseDate}
            </p>
            <p className="text-sm opacity-80 mb-4">
              Status: {api.status }
            </p>
            <p className="text-sm opacity-80 mb-4">
              Episodes: {api.totalEpisodes }
            </p>
            </div>
            <p className="text-sm">{api.description}</p>
            <Link href={`/episodes/${api.id}`}>
            <button className="mt-6 bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded-lg">
              Watch
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
