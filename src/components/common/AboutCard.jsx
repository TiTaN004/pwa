import React from 'react'

export default function AboutCard({img, text}) {
  return (
    <div className='min-[500px]:mt-[50px] max-[500px]:mt-[15px]'>
        <img src={img} className='min-[500px]:w-[150px] max-[500px]:w-[100px]' alt="" />
        <p className='min-[500px]:w-[150px] max-[500px]:w-[100px] max-[500px]:text-[14px] text-center'>{text}</p>
    </div>
  )
}
