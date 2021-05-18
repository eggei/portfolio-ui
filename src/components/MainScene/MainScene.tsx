import React, { Children } from "react";
import "./main.scss";
const classPrefix = "MainScene MainScene__";

export const MainScene = () => {
  return (
    <div className="MainSceneWrapper">
      {/* TABLE START */}
      <div className={classPrefix + "table"}>
        <img src="/images/brush-stroke.png" />
        <div className={classPrefix + "table__frontSurface"} />
      </div>
      {/* TABLE END */}

      {/* WALL START */}
      <div className={classPrefix + "wall"}>
        <img src="/images/brush-stroke.png" />
      </div>
      {/* WALL END */}
    </div>
  );
};
