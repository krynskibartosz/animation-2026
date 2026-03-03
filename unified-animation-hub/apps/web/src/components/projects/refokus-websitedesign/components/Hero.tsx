import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className='w-full min-h-screen flex flex-col justify-center 
        flex flex-col gap-[10vw] px-[5vw] 
        xl:px-0 mt-[20vw] 
        sm:mt-[6vw] lg:mt-[6vw] xl:mt-0'
    >
      <div className='flex items-end justify-end'>
        <div className='w-1/2 h-[4vw]'></div>
        <div className='w-[8vw] h-[12vw] sm:w-[3vw] 
          sm:h-[2vw] flex items-center'
        >
          <Image 
            src='/projects/refokus-websitedesign/iconLogo.svg' 
            width={32} height={32} 
            alt="" 
            className='w-[5vw] sm:w-[4vw] 
            lg:w-[1.8vw] xl:w-[1.5vw]'
          />
        </div>
      </div>
      <div className='lg:flex items-end justify-between'>
        <div className='text-[12vw] leading-[11vw] 
          sm:text-[12vw] sm:leading-[10vw] 
          lg:text-[8vw] lg:leading-[7.5vw] 
          xl:text-[6vw] xl:leading-[5.5vw] text-primary font-bold'
        >
          <h1 className='overflow-hidden'>
            <span className='block'>We</span>
          </h1>
          <h1 className='overflow-hidden'>
            <span className='block'>make</span>
          </h1>
          <h1 className='overflow-hidden'>
            <span className='block'>cool</span>
          </h1>
          <h1 className='overflow-hidden'>
            <span className='block'>websites</span>
          </h1>
        </div>
        <p className='text-[4vw] leading-[4.5vw] 
          sm:text-[2.5vw] sm:leading-[3vw] 
          lg:text-[1.5vw] lg:leading-[2vw] 
          xl:text-[1.2vw] xl:leading-[1.5vw] 
          w-full lg:w-[40%] text-secondary'
        >
          Refokus is a forward-thinking web agency that combines Web Design, Webflow Development, and Creative Development to create cool websites that help brands position themselves as market leaders.
        </p>
      </div>
    </div>
  )
}
