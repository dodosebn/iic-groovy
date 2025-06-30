import React from 'react'
import FirstIt from '../utils/firstIt';
import smiliing from '@/public/authors/auth-smilingGee.jpg';

const JohnDoe = () => {
      const name='Jonathan Doe';

  return (
    <div>
            <FirstIt displayImg={smiliing } name='Jonathan Doe' describ={'Chile'} paragraph={'Hello! My name is Jonathan Doe working from Chile. I create some Ghost and Wordpress themes for differents markets, also, i offer live support via our ticket system.'} />

    </div>
  )
}

export default JohnDoe;
