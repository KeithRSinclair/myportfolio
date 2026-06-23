import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Avatar } from "./Avatar";
import { TechOrbitButtons } from "./TechOrbitButtons";
import { OrbitControls } from "@react-three/drei";

const HeroAvatar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // 📱 Mobile View Block
  if (isMobile) {
    return (
      <Canvas camera={{ position: [0, 2, 8], fov: 70 }} >
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 3, 2]} intensity={2} castShadow />
        
        <group scale={[3, 3, 3]} position={[0.0, -2.8, 2.2]} rotation={[-0.4, -0.4, 0.00]}>
          <Avatar />
        </group>

        <group position={[0, -2, 2.6]} rotation={[-0.05, -0.1, 0]} scale={[2.2, 2.2, 2.2]}>
          <TechOrbitButtons show={true} isAnimating={false} onSelect={(tech) => console.log(tech)} />
        </group>

        <OrbitControls /> 
      </Canvas>
    );
  }

  // 🖥️ Desktop View Block (Updated with your exact corrections)
  return (
    <Canvas camera={{ position: [-0.8, 4.0, 8.0], fov: 60 }} >
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 3, 2]} intensity={2} castShadow />
      
      {/* 🕴️ Avatar Group */}
      <group
        scale={[4.0, 4.0, 4.0]} 
        position={[-0.09, -4.5, 3.5]}
        rotation={[-7, -0.4, -0.07]}
      >
        <Avatar />
      </group>

      {/* 🔵 Buttons Group */}
      <group 
        position={[0.0, -1.5, 4.5]} 
        rotation={[-0.5,-0.2, 0.0]} 
        scale={[2.5, 2.5, 2.5]}    
      >
        <TechOrbitButtons 
          show={true} 
          isAnimating={false} 
          onSelect={(tech) => console.log(`${tech} clicked!`)} 
        />
      </group>

      <OrbitControls target={[0.10, -2.7, 1.10]} /> 
    </Canvas>
  );
};

export default HeroAvatar;