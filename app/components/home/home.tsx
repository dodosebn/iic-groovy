import React from 'react'
import Intro from './intro'
import SResult from './sResult';
import Interested from './interested';

const Homee = () => {
  return (
    <div>
      <Intro />
      <div className='mt-10'>
      <SResult />
      </div>
      <Interested />
    </div>
  )
}

export default Homee;
