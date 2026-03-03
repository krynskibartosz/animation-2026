"use client";

import { useIsMobile } from '@/components/projects/elementis-sotd/providers';
import { ReactNode } from "react";
import ParallaxContainer from "@/components/projects/elementis-sotd/components/Client/ParallaxContainer";
interface ResponsiveImageProps {
  children: ReactNode;
  parallaxAmount: number;
}
export default function ResponsiveImage({
  children,
  parallaxAmount,
}: ResponsiveImageProps) {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        children
      ) : (
        <ParallaxContainer parallaxAmount={parallaxAmount}>
          {children}
        </ParallaxContainer>
      )}
    </>
  );
}
