import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Avatar } from "./Avatar";
// import { OrbitControls } from "@react-three/drei";

const HeroAvatar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // Baked-in coordinates from your visual tuning session
  const currentScale = 5.0;
  const currentPosition = isMobile ? [0.0, -5.2, 2.8] : [1, -3.5, 3.5];
  const currentRotation = isMobile ? [-0.50, -0.3, 0.00] : [-6.65, -0.5, 0.05];

  return (
    <>
      <Canvas camera={{ position: [0, 7, 13.5], fov: 58 }} >
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 3, 2]} intensity={2} castShadow />
        
        <group
          scale={currentScale}
          position={currentPosition}
          rotation={currentRotation}
        >
          <Avatar />
          {/* <OrbitControls /> */}
        </group>
      </Canvas>
    </>
  );
};

export default HeroAvatar;