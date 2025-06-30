import React from 'react'
import FirstIt from '../utils/firstIt';
import smilingGirle from '@/public/images/smilingGirlie.jpg';

const MaryBuzard = () => {
    const name='Mary Buzard';

  return (
    
    <div>
<FirstIt displayImg={smilingGirle} name='Mary Buzard' describ={'Collaborator & editor'}
       paragraph={'Hello! My name is Mary Buzard!, Actively writing articles for this website. I really like tutorials and illustrations, so stay alert for my next tutorials.'} />
     
    </div>
  )
}

export default MaryBuzard;
