import { Html, useProgress } from "@react-three/drei";
import "../index.css";

export default function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "24px",
            marginBottom: "20px",
            fontWeight: "bold",
            background:
              "linear-gradient(90deg, rgb(56, 189, 248), rgb(168, 85, 247), rgb(244, 114, 182))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Loading...
        </div>

        <div
          style={{
            width: "200px",
            height: "10px",
            backgroundColor: "#333",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            className="loader-progress"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </Html>
  );
}