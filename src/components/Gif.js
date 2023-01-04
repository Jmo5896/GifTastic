import React, { useState } from "react";
import downloadIcon from "bootstrap-icons/icons/box-arrow-down.svg";
import axios from "axios";
import fileDownload from "js-file-download";

export default function Gif({ gifObj, title, original }) {
  const [active, setActive] = useState(false);

  const handleDownload = async (url, filename) => {
    const response = await axios.get(url, {
      responseType: "blob",
    });
    fileDownload(response.data, filename);
  };

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
        <img
          style={{ cursor: "pointer" }}
          className="click"
          src={downloadIcon}
          onClick={(e) =>
            handleDownload(original, `${title.replaceAll(" ", "_")}.gif`)
          }
          width={25}
          alt={`download ${title} gif`}
        />
      </h5>
    </>
  );
}
