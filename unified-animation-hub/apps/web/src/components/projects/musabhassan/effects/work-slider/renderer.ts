import * as THREE from "three";
import { MeshRenderer } from "../base/renderer";
import { ImageMesh } from "../base/image-mesh";
import { vertexShader, getFragmentShaders } from "./shaders";
import { getDefaultStore } from "jotai";
import { workScrollStateAtom } from "../../lib/store";

const store = getDefaultStore();

export class SliderImageMesh extends ImageMesh {
    speed: number = 0;
    clock: THREE.Clock;

    constructor(element: HTMLImageElement, scene: THREE.Scene) {
        const shaders = {
            vertex: vertexShader,
            fragment: getFragmentShaders()
        };
        const uniforms = {
            uTime: { value: 0.0 },
            uOffset: { value: new THREE.Vector2(0.0, 0.0) },
            uAlpha: { value: 0.7 }
        };
        super(element, scene, shaders, element.parentElement!, uniforms);
        this.clock = new THREE.Clock();
    }

    createMesh() {
        super.createMesh();
        this.element.parentElement!.style.visibility = "hidden";
    }

    render() {
        super.render();
        this.speed = store.get(workScrollStateAtom).speed;
        this.uniforms.uOffset.value.set(this.speed * -0.0003, Math.abs(this.speed * 0.00005));
        this.uniforms.uTime.value = this.clock.getElapsedTime() * 0.8;
    }
}

export class ImageRenderer extends MeshRenderer {
    meshItems: SliderImageMesh[] = [];
    images: HTMLImageElement[];

    constructor(container: HTMLElement, images: HTMLImageElement[]) {
        super(container);
        this.images = images;
        this.setup();
    }

    setup() {
        this.images.forEach(img => {
            this.meshItems.push(new SliderImageMesh(img, this.scene));
        });
        super.setup();
    }

    render() {
        this.meshItems.forEach(item => item.render());
        super.render();
    }
}
