"use client";

import dynamic from "next/dynamic";
import MasonMintWrapper from "@/components/projects/mason-mint/MasonMintWrapper";
import { mockProducts } from "@mason-mint/utils/mockData";

const HomeContent = dynamic(
    () => import("@mason-mint/modules/Home").then((mod) => mod.HomeContent),
    { ssr: false }
);

const PageTransitionLayout = dynamic(
    () => import("@mason-mint/app/layouts/PageTransitionLayout"),
    { ssr: false }
);

const MarqueCarouselWrapper = dynamic(
    () => import("@mason-mint/components/MarqueeCarousel/MarqueeCarouselWrapper").then((mod) => mod.MarqueCarouselWrapper),
    { ssr: false }
);

export default function MasonMintPage() {
    return (
        <MasonMintWrapper>
            <PageTransitionLayout>
                <MarqueCarouselWrapper>
                    <HomeContent products={mockProducts} />
                </MarqueCarouselWrapper>
            </PageTransitionLayout>
        </MasonMintWrapper>
    );
}
