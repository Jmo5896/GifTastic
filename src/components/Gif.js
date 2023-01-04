import React, { useState } from "react";

export default function Gif({ gifObj, title, rating }) {
  const [active, setActive] = useState(false);
  return (
    <>
      <img
        className="click rounded"
        src={active ? gifObj.url : gifObj.still}
        alt={title}
        onClick={(e) => setActive(!active)}
      />
      <h5>{title}</h5>
    </>
  );
}
