'use client'

import React from 'react'
import Model from './Model'
import { Canvas } from '@react-three/fiber'

export default function Scene({scrollProgress}) {
  return (
    <Canvas>
        <Model scrollYProgress={scrollProgress}/>
    </Canvas>
  )
}

