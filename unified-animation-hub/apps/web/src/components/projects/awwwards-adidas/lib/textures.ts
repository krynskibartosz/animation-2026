export const studioTextures = {
  main: {
    defaultStudio: '/awwwards-adidas/textures/main/Default_Studio_Baked_Texture.webp',
    whiteStudio: '/awwwards-adidas/textures/main/White_Studio_Baked_Texture.webp',
    redStudio: '/awwwards-adidas/textures/main/Red_Studio_Baked_Texture.webp',
    grayStudio: '/awwwards-adidas/textures/main/Gray_Studio_Baked_Texture.webp',
    whiteShirt: '/awwwards-adidas/textures/main/White_Shirt_BakedTexture.webp',
    sportShirt: '/awwwards-adidas/textures/main/Sport_Shirt_Baked_Texture.webp',
    grayShirt: '/awwwards-adidas/textures/main/Gray_Shirt_Baked_Texture.webp',
  },
  shirts: {
    white: {
      first: {
        studio: '/awwwards-adidas/textures/white/first/White_Studio_Baked_Texture.webp',
        speakers: '/awwwards-adidas/textures/white/first/Speakers_Baked_Texture.webp',
        dj: '/awwwards-adidas/textures/white/first/Dj_Baked_Texture.webp',
        shirt: '/awwwards-adidas/textures/white/first/White_Shirt_Baked_Texture.webp',
        tv: '/awwwards-adidas/textures/white/first/TV_Screen.webp',
      },
      second: {
        shirt: '/awwwards-adidas/textures/white/second/White_Studio_Baked_Texture.webp',
        sphere: '/awwwards-adidas/textures/white/second/Sphere_Env_Baked_Texture.webp',
      },
      third: {
        normal: '/awwwards-adidas/textures/FloorNormal.png',
        overlay: '/awwwards-adidas/textures/SmudgesOverlay.jpg',
        icon: '/awwwards-adidas/textures/adidas.png',
      },
    },
    gray: {
      first: {
        shirt: '/awwwards-adidas/textures/gray/first/Gray_Shirt_Baked_Texture.webp',
        assets: '/awwwards-adidas/textures/gray/first/Assets_Baked_Texture.webp',
        wall: '/awwwards-adidas/textures/gray/first/Wall_Baked_Texture.webp',
        floor: '/awwwards-adidas/textures/gray/first/Floor_Baked_Texture.webp',
      },
      second: {
        shirt: '/awwwards-adidas/textures/gray/second/Gray_Shirt_Baked_Texture.webp',
        sphere: '/awwwards-adidas/textures/gray/second/Gray_Sphere_Env_Baked_Texture.webp',
      },
      third: {
        normal: '/awwwards-adidas/textures/FloorNormal.png',
        overlay: '/awwwards-adidas/textures/SmudgesOverlay.jpg',
        icon: '/awwwards-adidas/textures/adidas.png',
      },
    },
    sport: {
      first: {
        shirt: '/awwwards-adidas/textures/sport/first/Sport_Shirt_Baked_Texture.webp',
        env: '/awwwards-adidas/textures/sport/first/Floor_Baked_Texutre.webp',
        skateboard: '/awwwards-adidas/textures/sport/first/Skateboard_Baked_Texture.webp',
        ramp: '/awwwards-adidas/textures/sport/first/Ramp_Baked_Texture.webp',
      },
      second: {
        shirt: '/awwwards-adidas/textures/sport/second/Sport_Shirt_Baked_Texture.webp',
        sphere: '/awwwards-adidas/textures/sport/second/Sport_Sphere_Env_Baked_Texture.webp',
      },
      third: {
        normal: '/awwwards-adidas/textures/FloorNormal.png',
        overlay: '/awwwards-adidas/textures/SmudgesOverlay.jpg',
        icon: '/awwwards-adidas/textures/adidas.png',
      },
    },
  },
};

export const environmentPaths = {
  white: '/awwwards-adidas/textures/white/third/',
  gray: '/awwwards-adidas/textures/gray/third/',
  sport: '/awwwards-adidas/textures/sport/third/',
};

export const videoTextures = {
  white: '/awwwards-adidas/textures/white/third/adidas.mp4',
  gray: '/awwwards-adidas/textures/gray/third/adidas.mp4',
  sport: '/awwwards-adidas/textures/sport/third/adidas.mp4',
};

//Image path => useTexture
//Video paths => useVideoTexture
//cube map paths => useCubeTexture

export type ShirtType = keyof typeof studioTextures.shirts;
export type SectionType = "first" | "second" | "third";

export type TextureKey<
  S extends ShirtType,
  P extends SectionType
> = keyof (typeof studioTextures.shirts)[S][P];
