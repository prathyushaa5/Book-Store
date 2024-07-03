import React from 'react'
import {useLoaderData} from 'react-router-dom'
const SingleBook = () => {
    const {_id,bookTitle,imageurl}=useLoaderData();
  return (
   <div className='mt-28 px-4 lg:px-24'>
    <h2>{bookTitle}</h2>
    <img src={imageurl} alt="" className='h-96' ></img>
   </div>
  )
}

export default SingleBook