import React, { useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";

import Tile from "./Tile";

export default function Bakground() {
  const [screenDim, setScreenDim] = useState({ h: 0, w: 0 });
  const [posMatrix, setPosMatrix] = useState([]);
  const generatePosMatrix = (obj) => {
    const final = [];
    for (let h = -obj.h; h <= obj.h; h++) {
      for (let w = -obj.w; w <= obj.w; w++) {
        final.push([w, h, -2]);
      }
    }
    return final;
  };

  useEffect(() => {
    setPosMatrix(generatePosMatrix(screenDim));
  }, [screenDim]);

  return (
    <Canvas
      className="canvas"
      style={{ backgroundColor: "black" }}
      camera={{
        fov: 60,
      }}
      onCreated={({ viewport }) => {
        const { height, width } = viewport.getCurrentViewport();
        setScreenDim({
          h: Math.ceil(height / 2) + 2,
          w: Math.ceil(width / 2) + 2,
        });
      }}
    >
      <ambientLight color={0x555555} />
      <directionalLight color={0xffeedd} position={[0, 0, 1]} />
      <fogExp2 attach="fog" args={[0x11111f, 0.002]} />
      {posMatrix.map((posArr, i) => (
        <Tile key={i} position={posArr} />
      ))}
    </Canvas>
  );
}
