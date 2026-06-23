import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Avatar } from "./Avatar";
import { TechOrbitButtons } from "./TechOrbitButtons";


const HeroAvatar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // 📱 Mobile View Block
  if (isMobile) {
    return (
      <Canvas camera={{ position: [0, 2, 8], fov: 70 }} >
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 3, 2]} intensity={2} castShadow />
        
        <group scale={[3, 3, 3]} position={[0.0, -2.6, 2]} rotation={[-0.3, -0.4, 0.00]}>
          <Avatar />
        </group>

        <group position={[0, -2, 2.6]} rotation={[-0.2, -0.1, 0]} scale={[2.2, 2.2, 2.2]}>
          <TechOrbitButtons show={true} isAnimating={false} onSelect={(tech) => console.log(tech)} />
        </group>        
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
        scale={[3.4, 3.4,3.4]} 
        position={[0.1, -1.3, 2.2]}
        rotation={[-6.75, -0.4, -0.07]}
      >
        <Avatar />
      </group>

      {/* 🔵 Buttons Group */}
      <group 
        position={[0.0, 0.1, 3.8]} 
        rotation={[-0.5,-0.2, 0.0]} 
        scale={[2.5, 2.5, 2.5]}    
      >
        <TechOrbitButtons 
          show={true} 
          isAnimating={false} 
          onSelect={(tech) => console.log(`${tech} clicked!`)} 
        />
      </group>      
    </Canvas>
  );
};

export default HeroAvatar;