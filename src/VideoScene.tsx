import { OrbitControls, Stars, Plane, PerspectiveCamera } from '@react-three/drei';
import React, { useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { useFrame, useThree } from 'react-three-fiber';
import VideoTexture from './VideoTexture';



const VideoPlane: React.FC<{ videoUrl: string }> = ({ videoUrl }) => (
  <group>
    <mesh receiveShadow castShadow position={[0, 0.55, 0.005]}>
      <planeBufferGeometry args={[0.71, 1]} />
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

// Hacemos que OrbitControls esté disponible para r3f

const Controls = () => {
  const controlsRef = useRef<any>();
  const { camera, gl } = useThree();

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
      //console.log(controlsRef.current);
    }
  });



  return <OrbitControls target={[ -0.09100015106675328,  0.3236130715250734,   -0.32934198177717106]} ref={controlsRef} args={[camera, gl.domElement]} />;
};

const VideoScene: React.FC<{ videoUrl: string; floorTextureUrl: string }> = ({ videoUrl, floorTextureUrl }) => {

  return (
      <Canvas style={{ background: 'black' }}>
        <PerspectiveCamera makeDefault 
        position={[ 0.3988396435089508,1.0211306702433856,0.554781550240631]} fov={60}  />
        <hemisphereLight color={"#ffffff"} groundColor={"#888888"} intensity={0.3} />
        <directionalLight position={[0, 10, 5]} intensity={0.6} castShadow />
        <Controls />
        <Stars />
        <VideoPlane videoUrl={videoUrl} />
        <Floor textureUrl={floorTextureUrl} />
        <HologramProjector />
      </Canvas>
  );
};

export default VideoScene;



