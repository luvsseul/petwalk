import React from 'react'
import { useLocation } from 'react-router-dom'

export default function PostDetail() {
    const {state: {post: {id, image, spotType, title, today, writer, place, description}}} = useLocation();
  return (
    <>
        <p className='mx-12 mt-4 text-right text-gray-700'>{spotType}</p>
        <section className='flex flex-col md:flex-row p-4'>
            {image ? <img className='w-full basis-7/12 px-4' src={image} alt={title}/> : <img className='w-0 md:w-full px-4' src='https://picsum.photos/200/300' alt={title} />}
            <div className='w-full basis-5/12 flex flex-col p-4'>
                <h2 className='text-3xl font-bold py-2 border-b border-gray-400'>{title}</h2>
                <div className='flex items-baseline justify-between'>
                    <p className='text-xl font-bold py-2'>{writer}</p>
                    <p className='text-2xl font-bold py-2'>{today}</p>
                </div>
                <p>{place}</p>
                <p className='pt-4'>{description}</p>
            </div>
        </section>
    </>
  )
}
