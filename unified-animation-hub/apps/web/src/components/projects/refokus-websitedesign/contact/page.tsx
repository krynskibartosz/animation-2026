'use client'

import React from 'react'
import Cursor from "@/components/projects/refokus-websitedesign/components/StickyCursor/Index";
import { useRef} from 'react';
import Header from '@/components/projects/refokus-websitedesign/components/header/Index'
import ContactForm from '@/components/projects/refokus-websitedesign/components/ContactPage';

function Contact() {
    const stickyElement = useRef(null);
  return (
    <div 
      className='w-full min-h-[100vh] relative 
      bg-primary text-secondary overflow-hidden'
    >
      <Header ref={stickyElement}/>
      <Cursor stickyElement={stickyElement} />
      <ContactForm/>
    </div>
  )
}

export default Contact
