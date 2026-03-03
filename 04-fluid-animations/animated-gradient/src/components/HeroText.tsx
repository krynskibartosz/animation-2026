import { motion } from 'framer-motion';

const HeroText = () => {
  return (
    <div className="w-[80%] flex flex-col items-center justify-center ">
        <p 
            className="text-sm font-bold text-center text-nowrap text-gray-300 
            bg-slate-700 px-[.7vw] py-[.5vw] rounded-full"
        >
            Now security platform
        </p>
        <div className="overflow-hidden">
            <motion.h1
                initial={{y: 50, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 1}}
                className="text-[5vw] font-semibold text-center text-gray-100 leading-[6.8vw] "
            >Protect your organization</motion.h1>
        </div>
        <div>
            <motion.h1 
                initial={{y: 50, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 1, delay: 1}}
                className="text-[5vw] font-semibold text-center text-gray-100 leading-none"
            >from any threat</motion.h1>
        </div>
        <p className="w-[40%] text-[1vw] font-small text-center text-gray-100 text-wrap pt-[2vw]">
            Secureth is a cyber security platform encompasses a comprehensive array of tools 
            and services aimed at safeguarding.
        </p>
    </div>
  )
}

export default HeroText
