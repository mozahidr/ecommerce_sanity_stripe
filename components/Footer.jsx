import React from 'react';
import { AiFillInstagram, AiOutlineTwitter, AiOutlineFacebook } from 'react-icons/ai';

export const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 React Ecommerce Web App All rights reserved</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
        <AiOutlineFacebook />
      </p>
    </div>
  )
}
