"use client";

import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import MessageSection from "./sections/MessageSection";
import FlavorSection from "./sections/FlavorSection";
import { useGSAP } from "@gsap/react";
import NutritionSection from "./sections/NutritionSection";
import BenefitSection from "./sections/BenefitSection";
import TestimonialSection from "./sections/TestimonialSection";
import FooterSection from "./sections/FooterSection";

import "./index.css";

gsap.registerPlugin(ScrollTrigger);

export default function SplytWebsite() {
    return (
        <main>
            <NavBar />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <HeroSection />
                    <MessageSection />
                    <FlavorSection />
                    <NutritionSection />

                    <div>
                        <BenefitSection />
                        <TestimonialSection />
                    </div>

                    <FooterSection />
                </div>
            </div>
        </main>
    );
}
