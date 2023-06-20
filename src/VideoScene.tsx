import { OrbitControls, Stars, Plane } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const VideoTexture: React.FC<{ url: string }> = ({ url }) => {
  const video = useRef(document.createElement('video'));
  const texture = new THREE.VideoTexture(video.current);

  useEffect(() => {
    video.current.src = url;
    video.current.loop = true;
    video.current.muted = true;
    video.current.play();
  }, [url]);

  return <meshPhongMaterial map={texture} side={THREE.DoubleSide} transparent />;
};

const VideoPlane: React.FC<{ videoUrl: string }> = ({ videoUrl }) => (
  <group>
    <mesh receiveShadow castShadow position={[0, 0.5, 0.005]}>
      <planeBufferGeometry args={[1, 1]} />
      <VideoTexture url={videoUrl} />
    </mesh>
    <mesh receiveShadow castShadow position={[0, 0.5, -0.005]}>
      <planeBufferGeometry args={[1, 1]} />
      <VideoTexture url={videoUrl} />
    </mesh>
  </group>
);

const Floor: React.FC<{ textureUrl: string }> = ({ textureUrl }) => {
  const texture = useLoader(TextureLoader, textureUrl);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 5);

  return (
    <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <meshPhongMaterial map={texture} shininess={100} />
    </Plane>
  );
};

const HologramProjector: React.FC = () => (
  <mesh receiveShadow castShadow position={[0, 0, 0]}>
    <boxBufferGeometry args={[.1, 0.1, .1]} />
    <meshStandardMaterial color='cyan' />
  </mesh>
);

const VideoScene: React.FC<{ videoUrl: string; floorTextureUrl: string }> = ({ videoUrl, floorTextureUrl }) => {
  
    return (
      <>
        <Canvas style={{ background: 'black' }} camera={{ position: [0.2,1.1,0.6] }}>
          <hemisphereLight color={"#ffffff"} groundColor={"#888888"} intensity={0.3} />
          <directionalLight position={[0, 10, 5]} intensity={0.6} castShadow/>
          <OrbitControls  />
          <Stars />
          <VideoPlane videoUrl={videoUrl} />
          <Floor textureUrl={floorTextureUrl} />
          <HologramProjector />
        </Canvas>
      </>
    );
  };
  
  export default VideoScene;



