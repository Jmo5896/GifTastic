import React, { useRef, useState } from "react";

import { useLoader, useFrame } from "react-three-fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import side1 from "../images/side1.jpg";

export default function Tile({ position }) {
  const [hover, setHover] = useState(false);

  const mapper = useLoader(TextureLoader, side1);
  const myMesh = useRef();

  useFrame(() => {
    const rotLimit = (Math.PI / 180) * 360;
    if (hover) {
      myMesh.current.rotation.x += (Math.PI / 180) * 10;
      if (myMesh.current.rotation.x >= rotLimit) {
        setHover(false);
        myMesh.current.rotation.x = 0;
      }
    }
  });

  const handleHover = (e) => {
    setHover(true);
  };
  return (
    <mesh
      onPointerEnter={handleHover}
      ref={myMesh}
      position={position || [0, 0, 0]}
      rotation={[0, 0, 0]}
      opacity={1.0}
    >
      <planeGeometry args={[1, 1]} />
      <meshLambertMaterial
        map={mapper}
        // transparent
      />
    </mesh>
  );
}
