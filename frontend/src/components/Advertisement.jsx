import React from 'react'

const Advertisement = ({ img }) => {
  return (
    <div className='bg-white p-1 shadow-md cursor-pointer'>
      <img src={img} alt="" />
    </div>
  )
}

export default Advertisement
