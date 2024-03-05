import React, { useState } from 'react'
import { uploadImage } from '../api/uploadImage';
import { addNewPost } from '../api/firebase';
import { useQueryClient } from '@tanstack/react-query';
import getSearchResults from '../api/naverSearch';

export default function CommunityModal({onClose}) {
    const queryClient = useQueryClient();
    const [post, setPost] = useState({
        title: '',
        writer: '',
        spotType: '',
        today: '',
        description: '',
        place: ''
        });
   
    const [file, setFile] = useState();
    const [results, setResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState();
    const [query, setQuery] = useState('');
  
    const fetchSearchResults = (query)=> {
        getSearchResults(query).then(data => setResults(data));
        };

    const handleResultSelect = (result) => {
        setQuery(result.title.replace(/<[^>]+>/g, ''));
        setSelectedResult(result);
        setResults([]);
        };


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if(name === 'file') {
            setFile(files ? files[0] : '');            
        } else if(name === 'place') {
            setQuery(value ? value : '');
        }
        else {
        setPost((post) => ({...post, [name]: value }));
        }

    }
    const handleSubmit = async(e) => {
        e.preventDefault();        
        const today = new Date().toLocaleDateString();
        let imageUrl = '';    
        if (file) {
            imageUrl = await uploadImage(file).then(url => url);
        }    
        const updatedPost = { ...post, place: query, today, selectedResult };
        await addNewPost(updatedPost, today, imageUrl);
        
        queryClient.invalidateQueries(['post']);
        onClose();
    };
    
    console.log(selectedResult);
  return (
    //위치(지도상표시)
    <div className='fixed top-1/2 left-1/2 w-2/3 max-h-svh -translate-x-1/2 -translate-y-1/2 overflow-auto'>
            <section className='border bg-gray-200 rounded-3xl overflow-hidden shadow-lg p-4 w-full text-center'>
                <h2 className='text-2xl font-bold my-4'>강아지와 함께 갈수있는 곳을 추천해주세요!</h2>
                <form className='flex flex-col px-12' onSubmit={handleSubmit}>
                    <input
                    type="text"
                    name='title'
                    value={post.title}
                    placeholder='제목을 입력해주세요'
                    required
                    onChange={handleChange}/>
                    <input
                    type="text"
                    name='writer'
                    value={post.writer}
                    placeholder='닉네임'
                    required
                    onChange={handleChange}/>
                    <select name="spotType"
                    value={post.spotType}
                    required
                    onChange={handleChange}>
                        <option value="" disabled>장소 타입을 선택해주세요</option>
                        <option>애견동반카페</option>
                        <option>애견동반음식점</option>
                        <option>애견동반캠핑장</option>
                        <option>애견동반쇼핑몰</option>
                        <option>애견동반산책코스</option>
                        <option>애견동반문화생활</option>
                    </select>
                    <input
                    type="text"
                    name="place"
                    value={query}
                    onChange={handleChange}
                    placeholder="장소명을 입력하세요"/>
                    <button onClick={() => fetchSearchResults(query)}>검색</button>
                    {results && results.length > 0 && (
                        <ul className='w-full my-12'>
                            {results.map((result, index)=> (
                                <li className='w-2/3 p-2 mx-auto my-2 border bg-white rounded-2xl' key={index} onClick={()=> handleResultSelect(result)}>
                                    <h3>{result.title.replace(/<[^>]+>/g, '')}</h3>
                                    <p>{result.address}</p>
                                </li>
                            ))}
                        </ul>
                        )}
                    <textarea
                    name='description'
                    value={post.description}
                    placeholder='내용'
                    row='5'
                    required
                    onChange={handleChange}/>
                    {file && <img className='w-96 mx-auto my-2' src={URL.createObjectURL(file)} alt='local file' />}
                    <input
                    type="file"
                    accept='image/*'
                    name='file'
                    onChange={handleChange}/>
                    <button>글 등록하기</button>
                    <button type='reset' onClick={onClose}>X</button>
                </form>
            </section>
    </div>
  )
}
