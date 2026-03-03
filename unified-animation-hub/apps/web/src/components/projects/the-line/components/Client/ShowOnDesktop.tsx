"use client";

import { useIsDesktop } from "@/components/projects/the-line/providers/root/WindowSizeProvider";
import React, { ReactNode } from "react";

interface ShowOnDesktopProps {
  children: ReactNode;
  mobileFallBack?: ReactNode;
}

export default function ShowOnDesktop({
  children,
  mobileFallBack,
}: ShowOnDesktopProps) {
  const isDesktop = useIsDesktop();
  if (!isDesktop) return mobileFallBack || null;
  return <>{children}</>;
}
