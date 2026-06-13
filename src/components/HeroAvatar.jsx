import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Avatar } from "./Avatar";

const HeroAvatar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // Baked-in coordinates from your visual tuning session
  const currentScale = 5.0;
  const currentPosition = isMobile ? [0.0, -5.0, 2.8] : [2.5, -3.5, 3.5];
  const currentRotation = isMobile ? [-0.50, -0.50, 0.00] : [-6.65, -0.70, 0.05];

  return (
    <>
      <Canvas camera={{ position: [0, 7, 12.5], fov: 48.5 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 3, 2]} intensity={1.8} castShadow />
        
        <group
          scale={currentScale}
          position={currentPosition}
          rotation={currentRotation}
        >
          <Avatar />
        </group>
      </Canvas>
    </>
  );
};

export default HeroAvatar;