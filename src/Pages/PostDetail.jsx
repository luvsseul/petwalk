import React from 'react'
import { useLocation } from 'react-router-dom'
import RecommandSpot from '../components/RecommandSpot';

export default function PostDetail() {
    const {state: {post: {id, image, spotType, title, today, writer, place, description, selectedResult}}} = useLocation();
  return (
    <>
        <p className='mx-12 mt-4 text-right text-gray-700'>{spotType}</p>
        <section className='flex flex-col md:flex-row'>
            {image ? <div><img className='w-1/3 basis-1/3 px-4' src={image} alt={title}/></div> : <div><img className='w-full basis-1/2 px-4' src='https://picsum.photos/200/300' alt={title} /></div>}
            <div className='w-1/3 basis-1/3 flex flex-col p-4'>
                <h2 className='text-3xl font-bold py-2 border-b border-gray-400'>{title}</h2>
                <div className='flex items-baseline justify-between'>
                    <p className='text-xl font-bold py-2'>{writer}</p>
                    <p className='text-2xl font-bold py-2'>{today}</p>
                </div>
                <p>{place}</p>
                <p className='pt-4'>{description}</p>
            </div>
            <div className='w-full'>
                <RecommandSpot selectedResult={selectedResult} />
            </div>
        </section>
    </>
  )
}
