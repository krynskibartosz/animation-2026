"use client";

import { useIsMobile } from '@/components/projects/elementis-sotd/providers';
import HeroDesktopClient from "./Desktop";
import { useState } from "react";
import VideoPlayer from "@/components/projects/elementis-sotd/components/VideoPlayer";
import HeroMobileClient from "@/components/projects/elementis-sotd/sections/Hero/Client/Mobile";

export default function HeroClient() {
  const isMobile = useIsMobile();
  const [playIntro, setPlayIntro] = useState(false);
  return (
    <>
      {isMobile ? (
        <HeroMobileClient playIntro={playIntro} setPlayIntro={setPlayIntro} />
      ) : (
        <HeroDesktopClient setPlayIntro={setPlayIntro} />
      )}
      <VideoPlayer
        isMobile={isMobile}
        playIntro={playIntro}
        setPlayIntro={setPlayIntro}
      />
    </>
  );
}
