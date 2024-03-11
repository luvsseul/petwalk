import React from 'react'
import { useLocation } from 'react-router-dom'
import RecommandSpot from '../components/RecommandSpot';

export default function PostDetail() {
    const {state: {post: {id, image, spotType, title, today, writer, place, description, selectedResult}}} = useLocation();
  return (
    <div className='flex flex-col px-10 bg-bg -translate-y-10'>
        <div className='p-4 mx-auto mt-10 mb-3 rounded-full bg-white'>{spotType}</div>
        <section className='flex flex-col'>
            <div className='flex h-[300px] md:h-[500px] lg:h-[600px]'>
                <div>
                    {image ? <img className='w-full h-full px-4 rounded-l-[100px]' src={image} alt={title}/> : <img className='w-full px-4' src='https://picsum.photos/200/300' alt={title} />}
                </div>
                <div className='w-full mr-4 rounded-r-[100px] overflow-hidden'>
                    <RecommandSpot selectedResult={selectedResult} />
                </div>
            </div>
            <div className='w-full flex flex-col mt-6 p-4'>
                <h2 className='text-3xl font-bold py-2 border-b border-gray-400'>{title}</h2>
                <div className='flex items-baseline justify-between'>
                    <p className='text-xl font-bold py-2'>writer {writer}</p>
                    <p className='text-2xl font-bold py-2'>{today}</p>
                </div>
                <p className='text-right'>spot {place}</p>
                <p className='pt-4'>{description}</p>
            </div>
        </section>
    </div>
  )
}
