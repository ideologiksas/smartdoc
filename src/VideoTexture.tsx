import { useState, useEffect, useRef } from "react";
import { useLoader } from "react-three-fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

const VideoTexture: React.FC<{ url: string, loop: boolean }> = ({ url, loop = true }) => {
    const video = useRef<HTMLVideoElement | null>(null);
    const [texture, setTexture] = useState<THREE.Texture | null>(null);
    const [isGlitchActive, setGlitchActive] = useState(true);
    const previousUrl = useRef<string>(url);

    console.log('loop', loop);



    const glitchTexture = useLoader(TextureLoader, './sd_glitch.webp');
    glitchTexture.wrapS = THREE.RepeatWrapping;
    glitchTexture.wrapT = THREE.RepeatWrapping;

    useEffect(() => {
        video.current = document.createElement('video');

        const handleVideoEnded = () => {
            if(!loop) return;
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
            setGlitchActive(false);
        };

        video.current.src = url;
        video.current.crossOrigin = 'anonymous';
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url,loop]);

    useEffect(() => {
        if (previousUrl.current !== url) {
            previousUrl.current = url;
            setGlitchActive(true);
            video.current!.pause();
            video.current!.src = url;
            video.current!.currentTime = 0;
            video.current!.play();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url,loop]);

    return (
        <>
            {texture && !isGlitchActive && <meshPhongMaterial map={texture} side={THREE.DoubleSide} transparent />}
            {isGlitchActive && <meshBasicMaterial map={glitchTexture} side={THREE.DoubleSide} transparent blending={THREE.AdditiveBlending} opacity={0.2} />}
        </>
    );
};

export default VideoTexture;
