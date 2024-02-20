import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const [ text, setText ] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate(`/${text}`);
    }

    return (    
    <header className='w-full flex p-4 text-2xl border-b border-zinc-600 mb-4'>
    <Link to ='/' className='flex items-center'>
    <h1 className='font-bold ml-2 text-3xl'>Pet Walk</h1>
    </Link>
    <form className='w-full flex justify-center' onSubmit={handleSubmit}>
        <input className='w-7/12 p-2 outline-none bg-black text-gray-50' type='text' id='search' placeholder='Search to go !' value={text} onChange={e=> setText(e.target.value)}/>
        <label htmlFor='search'><button className='h-full bg-zinc-600 px-4'>찾기</button></label>
    </form>
</header>
    )
}
