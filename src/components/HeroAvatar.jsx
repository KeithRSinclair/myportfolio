import { useState } from "react";
import AvatarViewer from "./AvatarViewer";

const HeroAvatar = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleTechClick = (color) => {
    //console.log(`Tech clicked with color: ${color}`);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <AvatarViewer
        onLoaded={() => setIsLoaded(true)}
        onTechClick={handleTechClick}
      />
    </div>
  );
};

export default HeroAvatar;