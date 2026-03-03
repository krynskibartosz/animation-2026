"use client";
import { useIsDesktop } from "@/components/projects/the-line/providers/root/WindowSizeProvider";
import dynamic from "next/dynamic";
const ScrollBar = dynamic(() => import("@/components/projects/the-line/components/ScrollBar"), {
  ssr: false,
});

export default function ScrollBarWrapper() {
  const isDesktop = useIsDesktop();
  if (typeof isDesktop != "boolean" || !isDesktop) {
    return null;
  }
  return <ScrollBar />;
}
