"use client"
import React, { useEffect, useState } from 'react'

const Details = ({ params }) => {

    const { id } = params
    const [info, setinfo] = useState({});
    const [screenshot, setscreenshot] = useState([])
    const [videoshot, setvideoshot] = useState([])
    const [categorydata, setcategorydata] = useState([]);
    const [developer, setdeveloper] = useState([])
    const [publisher, setpublisher] = useState([])
    const [genresdata, setgenredata] = useState([])
    const [pcrequire, setpcrequire] = useState({});
    const [platform, setplatform] = useState({})

    useEffect(() => {
        fetchdetails();
    }, [id])

    const fetchdetails = () => {
        fetch(`https://steam-api7.p.rapidapi.com/appDetails/${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3b1a4fac7bmshd779f247bcd3562p1b66eajsn88d4cb9facc4',
                'X-RapidAPI-Host': 'steam-api7.p.rapidapi.com'
            }
        }).then(response => response.json()).then((data) => {
            console.log(data);
            setinfo(data);
            setscreenshot(data.media.screenshots)
            setvideoshot(data.media.videos)
            setcategorydata(data.categories)
            setdeveloper(data.developers)
            setgenredata(data.genres)
            setpublisher(data.publishers)
            setpcrequire(data.pc_requirements)
            setplatform(data.platfroms)
        })
    }

    return (
        <div className=" p-4">
            <div className="mb-8">
                <img src={info.header_image} alt={info.name} className="w-full h-auto" />
            </div>

            <div className=' flex justify-center items-center'>
                <h1>{info.name}</h1>
            </div>

            <hr />
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4">
                    {developer.map((d, index) => (
                        <div key={index}>
                            <h5 className="text-gray-400">Developers: {d}</h5>
                        </div>
                    ))}
                    {publisher.map((d, index) => (
                        <div key={index}>
                            <h5 className="text-gray-400">Publishers: {d}</h5>
                        </div>
                    ))}
                </div>
                <h4 className=' text-red-700'>Required Age: {info.required_age}</h4>
                <div>
                    <h4 className="text-gray-500">Release Date: &emsp;{info.release_date && info.release_date.date}</h4>
                </div>

                <hr />
                <div className="mb-3">
                    <h2 className="text-xl font-semibold mb-2">About This Game</h2>
                    <div dangerouslySetInnerHTML={{ __html: info.about_the_game }} />
                    <div dangerouslySetInnerHTML={{ __html: info.short_description }} />
                </div>

                <hr />

                <div className=' text-gray-400'>
                    <h4>Platforms: {info.platforms && Object.keys(info.platforms).filter(platform => info.platforms[platform]).join(', ')}</h4>
                    <h4>Price: {info.price_overview && info.price_overview.final} {info.price_overview && info.price_overview.currency}</h4>
                </div>

                <hr />
                <h3 className="text-gray-200 mr-2">Categories:</h3>
                <div className="flex items-center mb-1 flex-wrap">

                    {categorydata.map((d, index) => (
                        <div key={index} >
                            <h4 className="text-gray-400">{d.description},&emsp; </h4>
                        </div>
                    ))}
                </div>

                <hr />

                <div className="flex items-center mb-1">
                    <h3 className="text-gray-200 mr-2">Genres:</h3>
                    {genresdata.map((d, index) => (
                        <div key={index} >
                            <h4 className="text-gray-400">{d.description}, &emsp;</h4>
                        </div>
                    ))}
                </div>

                <hr />
                <h3 className='text-gray-200 mr-2'>Supported Languages: </h3>
                <div className="mb-2 text-gray-400"  >
                    <h4 dangerouslySetInnerHTML={{ __html: info.supported_languages }}></h4>
                </div>

                <hr />
                <h1 className="text-xl font-semibold mb-2">Screenshots of the game</h1>
                <div className="mb-8 overflow-x-auto">

                    <div className="flex gap-4"> {/* Adjust gap as needed */}
                        {screenshot.map((d, index) => (
                            <div key={index} className="w-96 flex-shrink-0"> {/* Adjust width as needed */}
                                <img src={d} alt={`Screenshot ${index + 1}`} className="w-full h-auto" />
                            </div>
                        ))}
                    </div>
                </div>

                <h1 className="text-xl font-semibold mb-2">Trailers & Videos</h1>
                <div className="mb-8 overflow-x-auto">

                    <div className="flex gap-4">
                        {videoshot.map((video, index) => (
                            <video key={index} width="400" height="225" controls poster={video.thumbnail}>
                                <source src={video.mp4} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ))}
                    </div>
                </div>

                <div className=' text-3xl text-gray-400'>
                <a href={info.website} target='_blank'>Visit Steam</a>
                </div>

                <hr />
                <div className="mb-4">
                    <h1 className="text-xl font-semibold mb-2">Requirements</h1>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">PC Requirements</h3>
                        <div dangerouslySetInnerHTML={{ __html: pcrequire.minimum }} />
                        <div dangerouslySetInnerHTML={{ __html: pcrequire.recommended }} />
                    </div>
                </div>


                <div>
                    <h3>Legal Notice: </h3>
                    <div dangerouslySetInnerHTML={{__html: info.legal_notice}}></div>
                </div>
            </div>
        </div>
    )
}

export default Details;