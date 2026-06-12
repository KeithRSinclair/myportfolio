import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Avatar } from "./Avatar";

const HeroAvatar = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <>
    
      <Canvas camera={{ position: [0, 7, 12.5], fov: 48.5 }}>
        <ambientLight intensity={1} />
        <group
          scale={isMobile ? 4 : 5}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4.2, 0]}
        >
          <Avatar />
        </group>
      </Canvas>
    </>
  );
};

export default HeroAvatar;
