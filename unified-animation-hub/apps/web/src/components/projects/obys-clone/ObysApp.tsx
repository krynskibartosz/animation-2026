"use client";

import { useEffect } from 'react'
import Landing from './components/landing/Index';
import Loader from './components/loader/Index';
import { ReactLenis } from '@studio-freight/react-lenis'
import Cursor from './components/Cursor/Index';
import Video from './components/Video/Index';
import About from './components/About/Index';
import Marqueue from './components/Marqueue/Index';
import Footer from './components/Footer/Index';
import Navbar from './components/Navbar/Index';
import Project from './components/Project/Index';
import CenterButton from './components/CenterButton';

function ObysApp() {
  return (
    <ReactLenis root>
      <div className='main text-white overflow-hidden'>
        <Cursor />
        <Loader />
        <div className=' bg-[#151515]'>
          <Navbar />
          <Landing />
          {/* video */}
          <Video />
          <Project />
          <CenterButton />
          <About />
          <Marqueue />
          <Footer />
        </div>
      </div>
    </ReactLenis>
  )
}

export default ObysApp
