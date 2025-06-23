import React from 'react'
import loogo from '@/public/images/logo-groovy.png';
import Image from 'next/image';
export const MLogo = () => {
  return (
    <>
<Image 
    src={loogo} 
    alt="Groovy logo"
    className="w-32 h-auto object-contain" 
  />  
  </>  
  )
}
export const Logo = () => {
  return (
    <>
<Image 
    src={loogo} 
    alt="Groovy logo"
    className="w-52 h-auto object-contain" 
  />  
  </>  
  )
}

