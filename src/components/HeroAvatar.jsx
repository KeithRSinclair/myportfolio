import { Canvas } from "@react-three/fiber";
import { useState } from "react"; 
import { useMediaQuery } from "react-responsive";
import { Avatar } from "./Avatar";
import { TechOrbitButtons } from "./TechOrbitButtons";
import { Environment } from "@react-three/drei";

const HeroAvatar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTech, setActiveTech] = useState("default");

  const handleTechSelect = (tech) => {
    console.log(`HeroAvatar state controller: ${tech} clicked!`); 
    if (isAnimating) {
      console.log("Animation is currently locked, ignoring input.");
      return; 
    }
    setActiveTech(tech);
  };

  // 📱 Mobile View Block
  if (isMobile) {
    return (
      <div 
        style={{ 
          width: "100%", 
          height: "100%", 
          pointerEvents: isAnimating ? "none" : "auto" // 👈 Prevent mouse glitching on mobile touch/scroll during spin
        }}
      >
        <Canvas camera={{ position: [0, 2, 8], fov: 70 }} >
          <Environment preset="city" />
          
          <group scale={[3, 3, 3]} position={[0.0, -2.7, 2]} rotation={[-0.3, -0.1, 0.00]}>
            <Avatar activeTech={activeTech} setIsAnimating={setIsAnimating} />
          </group>

          <group position={[0, -2, 2.6]} rotation={[-0.2, -0.1, 0]} scale={[2.5, 2.5, 2.5]}>
            <TechOrbitButtons show={true} isAnimating={isAnimating} onSelect={handleTechSelect} />
          </group>        
        </Canvas>
      </div>
    );
  }

  // 🖥️ Desktop View Block
  return (
    <div 
      style={{ 
        width: "100%", 
        height: "100%", 
        pointerEvents: isAnimating ? "none" : "auto" 
      }}
    >
      <Canvas camera={{ position: [-0.8, 4.0, 8.0], fov: 60 }} >
       <Environment preset="city" />
        
        {/* 🕴️ Avatar Group */}
        <group
          scale={[3.4, 3.4, 3.4]} 
          position={[0.1, -1.4, 2]}
          rotation={[-6.7, -0.1, -0.07]}
        >
          <Avatar activeTech={activeTech} setIsAnimating={setIsAnimating} />
        </group>

        {/* 🔵 Buttons Group */}
        <group 
          position={[0.0, 0.1, 3.8]} 
          rotation={[-0.5, -0.2, 0.0]} 
          scale={[2.5, 2.5, 2.5]}    
        >
          <TechOrbitButtons 
            show={true} 
            isAnimating={isAnimating} 
            onSelect={handleTechSelect} 
          />
        </group>      
      </Canvas>
    </div>
  );
};

export default HeroAvatar;