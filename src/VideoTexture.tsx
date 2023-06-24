import { useState, useEffect, useRef } from "react";
import { useLoader } from "react-three-fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

const VideoTexture: React.FC<{ url: string }> = ({ url }) => {
    const video = useRef<HTMLVideoElement | null>(null);
    const [texture, setTexture] = useState<THREE.Texture | null>(null);
    const previousUrl = useRef<string>(url);

    const glitchTexture = useLoader(TextureLoader, './sd_glitch.webp');
    glitchTexture.wrapS = THREE.RepeatWrapping;
    glitchTexture.wrapT = THREE.RepeatWrapping;

    useEffect(() => {
        video.current = document.createElement('video');

        const handleVideoEnded = () => {
            video.current!.pause();
            video.current!.currentTime = 0;
            video.current!.play();
        };

        const handleCanPlay = () => {
            const videoTexture = new THREE.VideoTexture(video.current as HTMLVideoElement);
            videoTexture.minFilter = THREE.LinearFilter;
            videoTexture.magFilter = THREE.LinearFilter;
            videoTexture.format = THREE.RGBAFormat;
            videoTexture.needsUpdate = true;
            setTexture(videoTexture);
        };

        video.current.src = url;
        video.current.crossOrigin = 'anonymous';
        video.current.loop = true;
        video.current.muted = true;
        video.current.addEventListener('ended', handleVideoEnded);
        video.current.addEventListener('canplay', handleCanPlay);
        video.current.load();
        video.current.play().catch(error => console.log(error));

        return () => {
            video.current!.pause();
            video.current!.removeEventListener('ended', handleVideoEnded);
            video.current!.removeEventListener('canplay', handleCanPlay);
            if (texture) {
                texture.dispose();
            }
        };
    }, [url]);


    useEffect(() => {
        if (previousUrl.current !== url) {
            previousUrl.current = url;
            // Aplicar efecto de transición de glitch
            if (texture) {
                texture.dispose();
                setTexture(null);
            }
            video.current!.pause();
            video.current!.src = url;
            video.current!.currentTime = 0;
            video.current!.play();
        }
    }, [url]);

    return (
        <>
            {texture && <meshPhongMaterial map={texture} side={THREE.DoubleSide} transparent />}
            <meshBasicMaterial map={glitchTexture} side={THREE.DoubleSide} transparent blending={THREE.AdditiveBlending} opacity={0.2} />
        </>
    );
};

export default VideoTexture;
