import React from 'react'

export default function Button({text, onClick}) {
  return (
    <button className='aspect-square p-3 rounded-full bg-green-700 text-green-100 text-xl hover:brightness-110' onClick={onClick}>{text}</button>
  )
}
