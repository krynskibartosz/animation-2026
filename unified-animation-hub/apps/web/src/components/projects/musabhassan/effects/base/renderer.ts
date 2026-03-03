import * as THREE from "three";

export class MeshRenderer {
    container: HTMLElement;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    isDestroyed: boolean = false;

    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
    }

    private get dimensions() {
        const width = window.innerWidth;
        const height = this.container.getBoundingClientRect().height;
        return {
            width,
            height,
            aspect: width / height
        };
    }

    setup() {
        const { width, height, aspect } = this.dimensions;
        const fov = (180 * (2 * Math.atan(height / 2 / 1000))) / Math.PI;

        this.camera = new THREE.PerspectiveCamera(fov, aspect, 1, 1000);
        this.camera.position.set(0, 0, 1000);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.windowResize.bind(this));
        this.render();
    }

    windowResize() {
        if (this.isDestroyed) return;
        const { width, height, aspect } = this.dimensions;
        this.camera.aspect = aspect;
        this.camera.fov = (180 * (2 * Math.atan(height / 2 / 1000))) / Math.PI;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    render() {
        if (this.isDestroyed) return;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }

    destroy() {
        this.isDestroyed = true;
        window.removeEventListener('resize', this.windowResize.bind(this));
        if (this.renderer && this.renderer.domElement) {
            this.container.removeChild(this.renderer.domElement);
            this.renderer.dispose();
        }
    }
}
