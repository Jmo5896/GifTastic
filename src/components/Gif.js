import React, { useState } from "react";

export default function Gif({ gifObj }) {
  const [active, setActive] = useState(false);
  return (
    <>
      <img
        className="click"
        src={active ? gifObj.url : gifObj.still}
        alt={gifObj.title}
        onClick={(e) => setActive(!active)}
      />
      <h5>
        {gifObj.title} | Rating: {gifObj.rating}
      </h5>
    </>
  );
}
