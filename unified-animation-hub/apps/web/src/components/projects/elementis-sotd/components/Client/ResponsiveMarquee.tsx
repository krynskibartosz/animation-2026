"use client";

import { useIsMobile } from '@/components/projects/elementis-sotd/providers';
import Marquee from "@/components/projects/elementis-sotd/components/Client/Marquee";
import { MotionStyle } from "motion/react";
import { PropsWithChildren } from "react";

type ResponsiveMarqueeProps = PropsWithChildren & {
  animationConfig: {
    mobile: {
      max: string;
      speed: number;
    };
    desktop: {
      max: string;
      speed: number;
    };
  };
  className?: string;
  style?: MotionStyle;
};
export default function ResponsiveMarquee({
  children,
  animationConfig,
  ...rest
}: ResponsiveMarqueeProps) {
  const isMobile = useIsMobile();
  if (typeof isMobile !== "boolean") {
    return null;
  }
  console.log(isMobile);
  return (
    <Marquee
      {...{ ...animationConfig[isMobile ? "mobile" : "desktop"], ...rest }}
    >
      {children}
    </Marquee>
  );
}
