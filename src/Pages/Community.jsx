import React, { useState } from 'react'
import CommunityModal from '../components/CommunityModal'
import PostCard from '../components/PostCard';
import Button from '../components/Button';
import { LuPencil } from "react-icons/lu";
import { usePostContext } from '../context/PostContext';

export default function Community() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {isLoading, error, post} = usePostContext();
    const style = {
      opacity: isModalOpen? '0.3' : '1',
    }
    const handleOpenModal = ()=> {
      setIsModalOpen(true);
    }
    const handleCloseModal = ()=> {
        setIsModalOpen(false);
    }

  return (
    <div className='flex -translate-y-10 bg-bg'>
    {isLoading && <p>loading...</p>}
    {error && <p>{error}</p>}
      <div style={style} className='flex flex-col pt-10'>
        <div className='m-auto p-2'> 
        <Button text={<LuPencil />} onClick={handleOpenModal} />
        </div>
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
          {post && post.map(post => (
          <PostCard key={post.id} post={post} />
          ))}
        </ul>
      </div>
      <div>
        {isModalOpen && (<CommunityModal onClose={handleCloseModal}/>)}
      </div>
    </div>
  )
}