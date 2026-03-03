'use client'
import { useScroll } from 'framer-motion';
import dynamic from 'next/dynamic'
import { useRef } from 'react';

const Scene = dynamic(() => import('@/components/Scene'), {ssr: false})

export default function Home() {
  const container = useRef();
  const { scrollYProgress} = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  return (
    <main>
      <div className='h-screen sticky top-0'>
        <Scene scrollProgress={scrollYProgress}/>
      </div>
    </main>
  );
}
