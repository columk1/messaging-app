import React, { Fragment } from 'react'
import Spinner from './Spinner'

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center z-50 bg-purple-3 bg-opacity-50 backdrop-blur-sm'>
      <Spinner />
    </div>
  )
}

export default Loading
