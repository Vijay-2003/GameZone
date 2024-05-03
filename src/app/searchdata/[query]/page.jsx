"use client"
import React, { useEffect, useState } from 'react';
// Import Tailwind CSS styles
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation';

const SearchData = ({ params }) => {
    const { query } = params;

    const [getdata, setgetdata] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch(`https://steam-api7.p.rapidapi.com/search?query=${query}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3b1a4fac7bmshd779f247bcd3562p1b66eajsn88d4cb9facc4',
                'X-RapidAPI-Host': 'steam-api7.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data.results);
                setgetdata(data.results);
            });

    }, [query]);

    const handledetails = (id) => {
        router.push(`/appdetails/${id}`);
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {getdata.map((d, index) => (
                <div key={index} onClick={() => handledetails(d.appid)} className='border border-gray-300 p-4 rounded-lg shadow-md cursor-pointer'>
                    <h1 className='text-xl font-bold'>{d.name}</h1>
                    <h4 className='text-sm text-gray-600'>App ID: {d.appid}</h4>
                </div>
            ))} 
        </div>
    );
}

export default SearchData;
