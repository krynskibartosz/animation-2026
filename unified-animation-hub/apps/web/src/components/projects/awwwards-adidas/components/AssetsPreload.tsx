import { environmentPaths, ShirtType, studioTextures } from "@/components/projects/awwwards-adidas/lib/textures";
import { useGLTF, useTexture } from "@react-three/drei";

const AssetsPreload = () => {
  useGLTF.preload('/awwwards-adidas/models/main/MainStudio.glb');
  useGLTF.preload('/awwwards-adidas/models/white/WhiteStudio.glb');
  useGLTF.preload('/awwwards-adidas/models/sport/SportStudio.glb');
  useGLTF.preload('/awwwards-adidas/models/gray/GrayStudio.glb');
  useGLTF.preload('/awwwards-adidas/models/ShirtScrolling.glb');

  Object.values(studioTextures.main).forEach((path) => {
    if (typeof path === "string") {
      useTexture.preload(path);
    }
  });

  (Object.keys(studioTextures.shirts) as ShirtType[]).forEach((shirtType) => {
    const shirtSection = studioTextures.shirts[shirtType];
    Object.values(shirtSection).forEach((section) => {
      if (typeof section === "object" && section !== null) {
        Object.values(section).forEach((texturePath) => {
          if (typeof texturePath === "string") useTexture.preload(texturePath);
        });
      }
    });
  });

  const cubeSides = [
    "px.png",
    "nx.png",
    "py.png",
    "ny.png",
    "pz.png",
    "nz.png",
  ];

  (Object.keys(environmentPaths) as ShirtType[]).forEach((shirtType) => {
    cubeSides.forEach((side) => {
      useTexture.preload(`${environmentPaths[shirtType]}${side}`);
    });
  });
  return null;
};

export default AssetsPreload;
