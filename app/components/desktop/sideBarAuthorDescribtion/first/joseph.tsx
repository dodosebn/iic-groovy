import React from 'react'
import FirstIt from '../utils/firstIt';
import headSet from '@/public/authors/auth-headset.jpg';

const Joseph = () => {
    const name='Joseph Fransis';

  return (
    
    <div>
      <FirstIt displayImg={headSet} name='Joseph Fransis' describ={'Chile'} paragraph={'Hello! My name is Joseph Fransis working from Chile. I create some Ghost and Wordpress themes for differents markets, also, i offer live support via our ticket system.'} />

    </div>
  )
}

export default Joseph;
