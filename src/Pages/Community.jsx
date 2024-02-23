import React, { useState } from 'react'

export default function Community() {
    const [product, setProduct] = useState({
        title: '',
        writer: '',
        spotType: ''
        });
   
    const [file, setFile] = useState();
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if(name === 'file') {
            setFile(files[0]);            
        } else {
        setProduct((product) => ({...product, [name]: value}));
    }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product);
        if (file) {
            console.log(file);
        }
    }
  return (
    //제목, 작성자, 작성일, 위치(지도상표시), 종류(애견동반카페, 애견동반음식점, 애견동반캠핑장, 애견동반문화생활, 애견동반쇼핑몰, 산책코스), 추천내용, 이미지
    <section className='w-full text-center'>
        <h2 className='text-2xl font-bold my-4'>강아지와 함께 갈수있는 곳을 추천해주세요!</h2>
        <form className='flex flex-col px-12' onSubmit={handleSubmit}>
            <input
            type="text"
            name='title'
            value={product.title}
            placeholder='제목을 입력해주세요'
            required
            onChange={handleChange}/>
            <input
            type="text"
            name='writer'
            value={product.writer}
            placeholder='닉네임'
            required
            onChange={handleChange}/>
            <select name="spotType"
            value={product.spotType}
            required
            onChange={handleChange}>
                <option value="" disabled>장소 타입을 선택해주세요</option>
                <option value="cafe">애견동반카페</option>
                <option value="food">애견동반음식점</option>
                <option value="camping">애견동반캠핑장</option>
                <option value="shoppingmall">애견동반쇼핑몰</option>
                <option value="walkcourse">애견동반산책코스</option>
                <option value="culture">애견동반문화생활</option>
            </select>
            {file && <img className='w-96 mx-auto my-2' src={URL.createObjectURL(file)} alt='local file' />}
            <input
            type="file"
            accept='image/*'
            name='file'
            onChange={handleChange}/>
            <button>글 등록하기</button>
        </form>
    </section>
  )
}
