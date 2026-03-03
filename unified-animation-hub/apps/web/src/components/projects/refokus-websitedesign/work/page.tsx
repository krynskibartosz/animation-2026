'use client'

import Header from '@/components/projects/refokus-websitedesign/components/header/Index'
import React from 'react'
import WorkPage from '@/components/projects/refokus-websitedesign/components/workPage/WorkPage';
import Cursor from "@/components/projects/refokus-websitedesign/components/StickyCursor/Index";
import { useRef} from 'react';
import Stripes from '@/components/projects/refokus-websitedesign/components/Stripes';
import Products from '@/components/projects/refokus-websitedesign/components/Products';
import Marquees from '@/components/projects/refokus-websitedesign/components/Marquees';
import Cards from '@/components/projects/refokus-websitedesign/components/Cards';

function Work() {
    const stickyElement = useRef(null);
  return (
    <div className='w-full min-h-[100vh] relative bg-primary text-secondary overflow-hidden'>  
      <Header ref={stickyElement} />
      <Cursor stickyElement={stickyElement} />
      <WorkPage/>
      <Stripes padding="py-[0vw]" />
      <Products/>
      <Marquees/>
      <Cards/>
    </div>
  )
}

export default Work