import * as THREE from "three";

export class ImageMesh {
    element: HTMLImageElement;
    dimensionsNode: HTMLElement;
    scene: THREE.Scene;
    offset: THREE.Vector2;
    sizes: THREE.Vector2;
    mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
    activeFragmentShader: string;
    uniforms: any;
    shaders: {
        fragment: { vertical: string, horizontal: string },
        vertex: string
    };

    constructor(element: HTMLImageElement, scene: THREE.Scene, shaders: any, dimensionsNode: HTMLElement, uniforms: any = {}) {
        this.element = element;
        this.scene = scene;
        this.shaders = shaders;
        this.uniforms = uniforms;
        this.dimensionsNode = dimensionsNode;
        this.offset = new THREE.Vector2(0, 0);
        this.sizes = new THREE.Vector2(0, 0);
        this.createMesh();
    }

    setDimensions() {
        const { width, height, left } = this.dimensionsNode.getBoundingClientRect();
        this.sizes.set(width, height);
        this.offset.set((left - (window.innerWidth / 2)) + (width / 2), 0);
    }

    createMesh() {
        this.setDimensions();
        const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
        const { width, height } = this.element.getBoundingClientRect();

        this.uniforms = {
            uTexture: { value: new THREE.TextureLoader().load(this.element.src) },
            uMeshSize: { value: new THREE.Vector2(this.sizes.x, this.sizes.y) },
            uImgSize: { value: new THREE.Vector2(width, height) },
            ...this.uniforms
        };

        this.activeFragmentShader = this.loadFragmentShader;
        this.mesh = new THREE.Mesh(geometry, new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: this.shaders.vertex,
            fragmentShader: this.activeFragmentShader,
            transparent: true
        }));

        this.mesh.position.set(this.offset.x, this.offset.y, 0);
        this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);
        this.scene.add(this.mesh);
    }

    render() {
        this.setDimensions();
        this.checkShader();
        this.mesh.position.set(this.offset.x, this.offset.y, 0);
        this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);

        const { width, height } = this.element.getBoundingClientRect();
        this.uniforms.uImgSize.value.set(width, height);
        this.uniforms.uMeshSize.value.set(this.sizes.x, this.sizes.y);
    }

    checkShader() {
        if (this.loadFragmentShader === this.activeFragmentShader) return;
        this.activeFragmentShader = this.loadFragmentShader;
        this.mesh.material.fragmentShader = this.activeFragmentShader;
        this.mesh.material.needsUpdate = true;
    }

    private get loadFragmentShader(): string {
        return (this.sizes.x / this.sizes.y) < 1 ? this.shaders.fragment.horizontal : this.shaders.fragment.vertical;
    }
}
