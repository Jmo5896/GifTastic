import React, { useState } from "react";
import downloadIcon from "bootstrap-icons/icons/box-arrow-down.svg";

export default function Gif({ gifObj, title, original }) {
  const [active, setActive] = useState(false);
  return (
    <>
      <img
        className="click rounded"
        src={active ? gifObj.url : gifObj.still}
        alt={title}
        onClick={(e) => setActive(!active)}
      />
      <h5>
        {title}{" "}
        <a
          className="click"
          href={original}
          target="_blank"
          download={`${title.replaceAll(" ", "_")}.gif`}
          rel="noopener noreferrer"
        >
          <img src={downloadIcon} width={25} alt={`download ${title} gif`} />
        </a>
      </h5>
    </>
  );
}
