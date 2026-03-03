import { Metadata } from "next";
import ShoeFinderClient from "./client";

export const metadata: Metadata = {
    title: "3D Shoe Finder | Animation Hub",
    description: "Explore our endless collection of sneakers",
};

export default function ShoeFinderPage() {
    return <ShoeFinderClient />;
}
