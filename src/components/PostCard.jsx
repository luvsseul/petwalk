import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PostCard({post, post: {id, title, today, writer, spotType, image}}) {
  const navigate = useNavigate();
  return (
    <li onClick={()=>{navigate(`/community/${id}`, {state: {post}})

    }} className='rounded-lg shadow-md overflow-hidden cursor-pointer'>
      {image ? <img className='w-full mx-auto my-2' src={image} alt={title} /> : <img className='w-full mx-auto my-2' src='https://picsum.photos/200/300' alt={title} />}
      <div className='mt-2 px-2 text-lg flex justify-between items-center'>
        <h3 className='truncate'>{title}</h3>
        <p>{today}</p>
      </div>
      <div className='mb-2 px-2 text-gray-600'>
        <p>{writer}</p>
        <p>{spotType}</p>
      </div>
    </li>
  )
}
