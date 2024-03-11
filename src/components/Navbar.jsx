import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';
import { IoIosPaw, IoIosSearch } from "react-icons/io";

export default function Navbar() {
    const navigate = useNavigate();
    const [ text, setText ] = useState('');
    const [ user, setUser ] = useState('');

    useEffect(()=> {
        onUserStateChange((user)=>{
            setUser(user);
        });
    },[]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate(`/${text}`);
    }
 
    return (    
    <header className='relative z-10 w-11/12 h-16 flex flex-row justify-between items-center p-2 my-4 mx-auto rounded-full border bg-white shadow-xl text-lg'>
        <Link to ='/' className='flex items-center font-bold ml-4 group'>
            <h1 className='text-3xl'>PetWalk</h1>
            <span className='text-brand text-4xl group-hover:rotate-12'><IoIosPaw /></span>
        </Link>
        <div className='transition-all basis-1/3 hover:basis-1/2 min-w-48'>  
            <form className='relative flex justify-center' onSubmit={handleSubmit}>
                <input className='w-full m-0 p-2 pl-4 outline-none rounded-full bg-black text-gray-50' type='text' id='search' placeholder='Search to go !' value={text} onChange={e=> setText(e.target.value)}/>
                <label className='absolute top-1/2 right-4 -translate-y-1/2' htmlFor='search'><IoIosSearch className='text-gray-50' /></label>
            </form></div>
        <div className='flex flex-row gap-4 mr-4'>
            <button className='mr-4'><Link to ='/community'>Community</Link></button>
            {user && <User user={user} />}
            {!user ? <button onClick={login}>Login</button> :<button onClick={logout}>Logout</button>}
        </div>
    </header>
    )
}
