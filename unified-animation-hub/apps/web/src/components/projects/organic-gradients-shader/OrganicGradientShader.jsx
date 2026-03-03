"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./components/shaders";

export default function OrganicGradientShader() {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        let scene, camera, renderer, clock, material, mesh, geometry;
        let time = 0;
        let sizes = { width: window.innerWidth, height: window.innerHeight };

        // SCENE
        scene = new THREE.Scene();

        // CAMERA
        camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height,
            0.1,
            100
        );
        scene.add(camera);
        camera.position.z = 10;

        // RENDERER
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
        mountRef.current.appendChild(renderer.domElement);

        // PLANE
        const fov = camera.fov * (Math.PI / 180);
        const planeHeight = camera.position.z * Math.tan(fov / 2) * 2;
        const planeWidth = planeHeight * camera.aspect;

        geometry = new THREE.PlaneGeometry(1, 1);
        material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uViewportRes: {
                    value: new THREE.Vector2(sizes.width, sizes.height),
                },
                uRedFactor: { value: 0.5 },
                uGreenFactor: { value: 0.2 },
                uBlueFactor: { value: 0.1 },
            },
        });

        mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(planeWidth, planeHeight, 1);
        scene.add(mesh);

        // CLOCK
        clock = new THREE.Clock();

        // RESIZE
        const handleResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

            const newFov = camera.fov * (Math.PI / 180);
            const newHeight = camera.position.z * Math.tan(newFov / 2) * 2;
            const newWidth = newHeight * camera.aspect;
            mesh.scale.set(newWidth, newHeight, 1);

            material.uniforms.uViewportRes.value.set(sizes.width, sizes.height);
        };

        window.addEventListener("resize", handleResize);

        // ANIMATION LOOP
        const tick = () => {
            time = clock.getElapsedTime();
            material.uniforms.uTime.value = time;
            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        };

        tick();

        // CLEANUP
        return () => {
            window.removeEventListener("resize", handleResize);
            if (mountRef.current?.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <>
            <div
                ref={mountRef}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
            />
            <div className="z-10 relative flex flex-col p-[4vmax] min-h-screen">
                <div className="flex-1 relative w-full">
                    <div className="p-[4vmax] text-[max(1.2rem,1.3vmax)] text-white flex justify-between">
                        <div>
                            Shaders__01<br />
                            Experiments
                        </div>
                        <div>
                            <a
                                className="block relative rounded-full text-[max(1rem,1.2vmax)]"
                                href="https://github.com/J0SUKE/organic-gradients-shader"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    height="calc(max(1.2rem,1.6vmax) + max(.8rem,1.2vmax))"
                                    viewBox="0 0 123 46"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 0C112.703 0 123 10.2975 123 23C123 35.7025 112.703 46 100 46H23C10.2975 46 0 35.7025 0 23C0 10.2975 10.2975 0 23 0H100ZM81.6104 19.7119C80.0626 19.712 79.0729 20.45 78.4609 21.2959L78.2627 19.8203H76.9844V32.5996H78.4609V27.5957C79.0189 28.4777 80.0625 29.1083 81.6104 29.1084C84.1483 29.1084 86.0204 27.2181 86.0205 24.4102C86.0205 21.4222 84.1484 19.7119 81.6104 19.7119ZM41.7676 19.7119C39.6978 19.694 38.1681 20.792 38.168 22.4658C38.168 24.3737 39.8056 24.788 41.8574 25.04C43.2254 25.202 44.2334 25.2923 44.2334 26.4443C44.2332 27.2901 43.3154 27.8477 42.0195 27.8477C40.4897 27.8475 39.5354 27.0555 39.4814 25.9756H37.9697C38.0057 27.9915 39.6437 29.1083 42.0195 29.1084C44.0535 29.1084 45.6914 28.0459 45.6914 26.3359C45.6914 24.302 44.0177 23.9063 41.9297 23.6543C40.5979 23.4923 39.6262 23.366 39.626 22.3584C39.626 21.5125 40.4897 20.9718 41.7676 20.9717C43.0276 20.9717 43.892 21.6744 44 22.6104H45.5117C45.3677 20.7024 43.8556 19.7299 41.7676 19.7119ZM70.9443 19.7119C68.3523 19.7119 66.5879 21.6202 66.5879 24.4102C66.588 27.2181 68.3886 29.1084 71.1426 29.1084C73.2664 29.1083 74.7787 27.7578 75.1387 25.9219H73.6445C73.3385 27.1099 72.3302 27.7939 71.0342 27.7939C69.2883 27.7939 68.1908 26.5701 68.1367 24.8242V24.6982H75.2646C75.2826 24.4824 75.3008 24.2663 75.3008 24.0684C75.2288 21.3504 73.5363 19.7119 70.9443 19.7119ZM91.9375 19.7119C89.2555 19.7119 87.3828 21.6202 87.3828 24.4102C87.3829 27.2001 89.2556 29.1084 91.9375 29.1084C94.6193 29.1083 96.4911 27.2 96.4912 24.4102C96.4912 21.6203 94.6194 19.712 91.9375 19.7119ZM25.0898 19.8203L28.5283 29H30.3096L33.748 19.8203H32.2002L29.4463 27.3262L26.6738 19.8203H25.0898ZM34.8496 19.8203V29H36.3262V19.8203H34.8496ZM47.3301 19.8203V29H48.8066V19.8203H47.3301ZM51.5127 17.2461V19.8203H49.8564V21.1699H51.5127V26.6064C51.5128 28.2261 52.1425 29 53.9062 29H55.5088V27.6504H54.0508C53.2588 27.6504 52.9883 27.3619 52.9883 26.5879V21.1699H55.3643V19.8203H52.9883V17.2461H51.5127ZM61.498 19.8203V29H62.9746V24.3203C62.9746 22.8624 63.4962 21.26 65.4219 21.2598H66.1602V19.8203H65.7461C64.1083 19.8204 63.4066 20.5041 62.9746 21.2061L62.7764 19.8203H61.498ZM81.4668 21.0264C83.2847 21.0265 84.5088 22.4122 84.5088 24.4102C84.5087 26.408 83.2846 27.7938 81.4668 27.7939C79.6668 27.7939 78.4424 26.39 78.4424 24.374C78.4424 22.412 79.6668 21.0264 81.4668 21.0264ZM91.9375 21.0264C93.7553 21.0265 94.9795 22.4483 94.9795 24.4102C94.9794 26.372 93.7553 27.7938 91.9375 27.7939C90.1195 27.7939 88.8956 26.3721 88.8955 24.4102C88.8955 22.4482 90.1195 21.0264 91.9375 21.0264ZM70.9619 21.0078C72.4918 21.0078 73.5717 21.8899 73.7158 23.4736H68.2266C68.3707 21.98 69.6122 21.008 70.9619 21.0078ZM35.6055 16.3643C35.0656 16.3644 34.6514 16.7605 34.6514 17.3184C34.6515 17.8761 35.0657 18.2723 35.6055 18.2725C36.1454 18.2725 36.5594 17.8762 36.5596 17.3184C36.5596 16.7604 36.1455 16.3643 35.6055 16.3643ZM48.0859 16.3643C47.5461 16.3644 47.1318 16.7605 47.1318 17.3184C47.132 17.8761 47.5462 18.2723 48.0859 18.2725C48.6258 18.2725 49.0399 17.8762 49.04 17.3184C49.04 16.7604 48.6259 16.3643 48.0859 16.3643Z"
                                        fill="white"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div
                        style={{
                            background: "radial-gradient(circle at top left, transparent 3vmax, #ffffff 3vmax)"
                        }}
                        className="hidden md:block absolute bottom-0 right-0 h-[3vmax] w-[3vmax]"
                    ></div>
                    <div
                        style={{
                            background: "radial-gradient(circle at bottom right, transparent 3vmax, #ffffff 3vmax)"
                        }}
                        className="absolute top-0 left-0 h-[3vmax] w-[3vmax]"
                    ></div>
                    <div
                        style={{
                            background: "radial-gradient(circle at bottom left, transparent 3vmax, #ffffff 3vmax)"
                        }}
                        className="absolute top-0 right-0 h-[3vmax] w-[3vmax]"
                    ></div>
                </div>
                <div
                    style={{
                        background: "radial-gradient(circle at top right, transparent 3vmax, #ffffff 3vmax)"
                    }}
                    className="block md:hidden absolute bottom-[4vmax] left-[4vmax] h-[3vmax] w-[3vmax]"
                ></div>
                <div className="flex flex-col items-start md:flex-row pb-[2vmax] px-[2vmax]">
                    <h1 className="pb-[4vmax] pl-[2vmax] pr-[2vmax] text-white relative text-[6vmax] font-bold">
                        Organic Radial<br />
                        Gradients shader
                        <div
                            style={{
                                background: "radial-gradient(circle at top left, transparent 3vmax, #ffffff 3vmax)"
                            }}
                            className="hidden md:block absolute bottom-0 right-0 h-[3vmax] w-[3vmax]"
                        ></div>
                        <div
                            style={{
                                background: "radial-gradient(circle at top right, transparent 3vmax, #ffffff 3vmax)"
                            }}
                            className="hidden md:block absolute bottom-0 left-0 h-[3vmax] w-[3vmax]"
                        ></div>
                    </h1>
                    <div className="bg-white flex-1 h-full rounded-tl-[3vmax] relative font-medium text-[max(1rem,1.4vmax)] flex md:items-end justify-end pt-[2vmax] pb-[2vmax] self-end pr-[4vmax]">
                        <ul className="flex flex-col gap-[max(0.7rem,0.8vmax)] opacity-50 items-end">
                            <li>
                                <a
                                    href="https://github.com/J0SUKE"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-[max(0.6rem,0.8vmax)] pb-[max(0.1rem,0.2vmax)] relative hover:opacity-75 transition-opacity"
                                >Github
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://x.com/highpfloat"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-[max(0.6rem,0.8vmax)] pb-[max(0.1rem,0.2vmax)] relative hover:opacity-75 transition-opacity"
                                >Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/chakib-mazouni/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-[max(0.6rem,0.8vmax)] pb-[max(0.1rem,0.2vmax)] relative hover:opacity-75 transition-opacity"
                                >LinkedIn
                                </a>
                            </li>
                        </ul>

                        <div
                            style={{
                                background: "radial-gradient(circle at top left, transparent 3vmax, #ffffff 3vmax)"
                            }}
                            className="block md:hidden absolute bottom-[0] left-[0] translate-x-[-100%] h-[3vmax] w-[3vmax]"
                        ></div>
                        <div
                            style={{
                                background: "radial-gradient(circle at top left, transparent 3vmax, #ffffff 3vmax)"
                            }}
                            className="block md:hidden absolute top-0 right-0 translate-y-[-100%] h-[3vmax] w-[3vmax]"
                        ></div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 inset-0 pointer-events-none">
                    <div className="h-[4vmax] bg-white absolute bottom-0 left-0 w-full"></div>
                    <div className="h-[4vmax] bg-white absolute top-0 left-0 w-full"></div>
                    <div className="w-[4vmax] bg-white absolute bottom-0 left-0 h-full"></div>
                    <div className="w-[4vmax] bg-white absolute bottom-0 right-0 h-full"></div>
                </div>
            </div>
        </>
    );
}
