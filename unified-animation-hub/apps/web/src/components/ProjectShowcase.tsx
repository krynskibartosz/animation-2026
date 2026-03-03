"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
    id: string;
    name: string;
    description: string;
    status: string;
    href: string;
    color: string;
    category: string;
};

const CATEGORIES = ["All", "3D & WebGL", "Awwwards Clones", "UI/UX & Interactions", "Portfolios"];

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = projects.filter((project) => {
        const matchesCategory = activeCategory === "All" || project.category === activeCategory;
        const matchesSearch =
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="w-full">
            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat
                                    ? "bg-white text-black"
                                    : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-full leading-5 bg-zinc-900/50 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 sm:text-sm transition-colors"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.length === 0 ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-zinc-500 col-span-1 md:col-span-2 text-center py-12"
                        >
                            No projects found matching your search.
                        </motion.p>
                    ) : (
                        filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
                            >
                                <Link
                                    href={project.href}
                                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-8 hover:border-zinc-700 transition-colors h-full"
                                >
                                    <div className={`absolute -right-20 -top-20 z-0 h-64 w-64 rounded-full bg-gradient-to-br ${project.color} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`} />

                                    <div className="z-10 relative">
                                        <div className="flex justify-between items-start mb-12">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                                                    {project.status}
                                                </span>
                                                <span className="inline-flex items-center rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300 ring-1 ring-inset ring-zinc-700">
                                                    {project.category}
                                                </span>
                                            </div>
                                            <div className="text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                                                <ArrowRightIcon className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <h2 className="text-2xl font-semibold mb-3">{project.name}</h2>
                                        <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
