'use client'

import React, { useRef } from 'react';
import { useControls } from 'leva';
import { fragment, vertex } from './shader';
import { useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { transform } from 'framer-motion';

export default function Model({scrollProgress}) {

    const plane = useRef();
    const texture = useTexture("/images/ocean2.jpg")
    const { width, height } = texture.image;
    const { viewport } = useThree();

    const scale = useAspect(
        width,
        height,
        0.1
    );

    const { amplitude, wavelength } = useControls({
        amplitude: { value: 0.25, min: 0, max: 2, step: 0.05 },
        wavelength: { value: 5, min: 0, max: 20, step: 1 },
    })

    const uniforms = useRef({
        uTexture: { value: texture },
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uWavelength: { value: wavelength },
    })

    useFrame(() => {
        
        // const scaleX = scrollProgress ? transform(scrollProgress.get(), [0,1], [scale[0], viewport.width]) : scale[0]
        // const scaleY = scrollProgress ? transform(scrollProgress.get(), [0,1], [scale[1], viewport.height]) : scale[1]

        // plane.current.scale.x = scaleX
        // plane.current.scale.y = scaleY


        // const modifiedAmplitude = scrollProgress ? transform(scrollProgress.get(), [0, 1], [amplitude, 0]) : amplitude;
        plane.current.material.uniforms.uTime.value += 0.04;
        plane.current.material.uniforms.uAmplitude.value = amplitude;
        plane.current.material.uniforms.uWavelength.value = wavelength;
    })
    return (
        <mesh ref={plane} scale={scale}>
            <planeGeometry args={[3, 3, 45, 45]}/>
            <shaderMaterial
                vertexShader={vertex}
                fragmentShader={fragment}
                wireframe={false}
                uniforms={uniforms.current}
            />
        </mesh>
    )
}

