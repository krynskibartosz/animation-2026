"use client";

import dynamic from "next/dynamic";
import "./elementis-globals.css";
import { WindowSizeProvider } from "@/components/projects/elementis-sotd/providers";
import { ReactLenis } from "@/components/projects/elementis-sotd/utils/lenis";

const NavBar = dynamic(() => import("@/components/projects/elementis-sotd/components/Client/NavBar"), { ssr: false });
const SustainableRetreat = dynamic(() => import("@/components/projects/elementis-sotd/components/Client/SustainableRetreat"), { ssr: false });
const ElementisStory = dynamic(() => import("@/components/projects/elementis-sotd/sections/ElementisStory"), { ssr: false });
const WellnessSanctuary = dynamic(() => import("@/components/projects/elementis-sotd/sections/WellnessSanctuary"), { ssr: false });
const Footer = dynamic(() => import("@/components/projects/elementis-sotd/sections/Footer/Server"), { ssr: false });
const Form = dynamic(() => import("@/components/projects/elementis-sotd/sections/Form"), { ssr: false });
const Innovation = dynamic(() => import("@/components/projects/elementis-sotd/components/Client/Innovation"), { ssr: false });
const Hero = dynamic(() => import("@/components/projects/elementis-sotd/sections/Hero"), { ssr: false });
const Introduction = dynamic(() => import("@/components/projects/elementis-sotd/sections/Introduction"), { ssr: false });

export default function ElementisSotdPage() {
    return (
        <div className="elementis-sotd" style={{ fontFamily: "var(--font-grotesque, sans-serif)" }}>
            <ReactLenis root>
                <WindowSizeProvider>
                    <main>
                        <Hero />
                        <Introduction />
                        <WellnessSanctuary />
                        <Innovation />
                        <ElementisStory />
                        <SustainableRetreat />
                        <Form />
                        <Footer />
                        <NavBar />
                    </main>
                </WindowSizeProvider>
            </ReactLenis>
        </div>
    );
}
