import React, { useState } from 'react'
import CommunityModal from '../components/CommunityModal'
import { useQuery } from '@tanstack/react-query';
import { getPost } from '../api/firebase';
import PostCard from '../components/PostCard';

export default function Community() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const style = {
      opacity: isModalOpen? '0.3' : '1',
    }
    const handleOpenModal = ()=> {
      setIsModalOpen(true);
    }
    const handleCloseModal = ()=> {
        setIsModalOpen(false);
    }

    const { isLoading, error, data: post } = useQuery({
      queryKey: ['post'],
      queryFn: getPost
    })
  return (
    <div className='flex'>
    {isLoading && <p>loading...</p>}
    {error && <p>{error}</p>}
      <div style={style}>   
        <button onClick={handleOpenModal}>글쓰기</button>
        <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
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