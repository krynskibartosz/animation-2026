import { Metadata } from "next";
import RefokusWebsiteDesignClient from "./client";

export const metadata: Metadata = {
    title: "Refokus Website Design | Animation Hub",
    description: "An Awwwards winning design studio website with advanced animations and interactions.",
};

export default function RefokusWebsiteDesignPage() {
    return <RefokusWebsiteDesignClient />;
}
