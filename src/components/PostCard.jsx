import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PostCard({post, post: {id, title, today, writer, spotType, place, image}}) {
  const navigate = useNavigate();
  return (
    <li onClick={()=>{navigate(`/community/${id}`, {state: {post}})

    }} className='flex flex-col border m-2 bg-white rounded-tl-[100px] rounded-br-[100px] shadow-md p-4 cursor-pointer'>
      {image ? <img className='w-full max-h-96 rounded-tl-[100px]' src={image} alt={title} /> : <img className='w-full rounded-xl' src='https://picsum.photos/200/300' alt={title} />}
      <div className='mt-2 px-2 text-lg flex flex-col items-center'>
        <p>{today}</p>
        <h3 className='w-full truncate'>{title}</h3>
      </div>
      <div className='mb-2 px-2 text-gray-600'>
        <p>{writer}</p>
        <p>{spotType}</p>
        <p>{place}</p>
      </div>
    </li>
  )
}
