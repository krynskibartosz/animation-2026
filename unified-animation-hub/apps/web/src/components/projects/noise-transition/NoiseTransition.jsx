"use client";

import CodropsFrame from "./CodropsFrame";
import Scene from "./Scene";
import "./css/base.css";

export default function NoiseTransition() {
    return (
        <div className="noise-transition-container">
            <CodropsFrame />
            <Scene />
        </div>
    );
}
