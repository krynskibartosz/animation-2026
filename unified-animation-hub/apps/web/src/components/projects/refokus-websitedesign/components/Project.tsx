import Image from 'next/image'
import React, { useRef } from 'react'
import Button from './button/Button'
import { useScroll, useTransform , motion} from 'framer-motion';

function Project({val}: {val: any}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress} = useScroll ({
        target: ref,
        offset: ["0 1", "1.33 1"],
    });

    const scaleProgress = useTransform(scrollYProgress, [0,1], [0.8, 1]);
    // const opacityProgress = useTransform(scrollYProgress, [0,1], [0.6, 1]);
  return (
    <motion.div
        ref={ref}
        style={{
            scale: scaleProgress,
            // opacity: opacityProgress,
            backgroundColor: val.bg
        }} 
        className={`w-full sm:py-[2vw] py-[4vw] 
            px-[4vw] sm:px-[2vw] 
            rounded-2xl flex gap-[1vw] bg-secondary`
        }
    >
        <div className='sm:w-1/2 flex flex-col items-start gap-[1.5vw] '>
            <h2 className=''>
                <Image src={val.logo}
                    alt="" width={32} height={32}
                    className='hidden sm:block sm:w-[8vw]'    
                />
            </h2>
            <div className='w-full hidden sm:flex justify-end'>
                <div className='pt-[1vw]'>
                    <Image src={val.image1} alt="" 
                    width={1000} height={100}
                    className='w-[16vw] rounded-2xl' />
                </div>    
            </div> 
            <Image src={val.image2} alt="" 
            width={1000} height={32}
            className='w-[38vw] hidden sm:block rounded-2xl' />
        </div>
        <div className='w-full sm:w-1/2'>
            <h2 className=''>
                <Image src={val.logo}
                    alt="" width={32} height={32}
                    className=' sm:hidden w-[32vw] py-[4vw] mb-[3vw]'    
                />
            </h2>
            <h3 className='text-[5vw] leading-[5vw] sm:text-[3vw] sm:leading-[3vw] lg:text-[2vw] lg:leading-[2vw] xl:text-[1.5vw] xl:leading-[1.5vw] text-primary font-bold'>
                {val.title}
            </h3>
            <p className='text-[3vw] leading-[4vw] sm:text-[1.5vw] sm:leading-[2vw] lg:text-[1.2vw] lg:leading-[1.5vw] xl:text-[1vw] xl:leading-[1.3vw] text-secondary py-[2vw]'>
                {val.description}
            </p>
            <div className='flex flex-wrap gap-[1vw] py-[2vw]'>
                {val.tags.map((tag: string, index: number) => (
                    <span key={index} className='text-[2.5vw] sm:text-[1vw] lg:text-[0.8vw] xl:text-[0.7vw] bg-accent/20 text-accent px-[1vw] py-[0.5vw] rounded-full'>
                        {tag}
                    </span>
                ))}
            </div>
            <div className='flex gap-[2vw] py-[2vw]'>
                <Button text="View Website" />
                <Button text="View Case Study" />
            </div>
        </div>
    </motion.div>
  )
}

export default Project
