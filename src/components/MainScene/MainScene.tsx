import React, { Children } from "react";
import "./main.scss";
const classPrefix = "MainScene MainScene__";

export const MainScene = () => {
  return (
    <>
      <img src="/images/blueprint.png" className="blueprint" />
      <div className="MainSceneWrapper">
        {/* WALL START */}
        <div className={classPrefix + "wall"}>
          <img src="/images/brush-stroke.png" />
        </div>
        {/* WALL END */}

        {/* TABLE START */}
        <div className={classPrefix + "table"}>
          <img src="/images/green-brush-strokes-background.jpeg" />
        </div>
        {/* TABLE END */}

        <div className={classPrefix + "itemsWrapper"}>
          {/* MUG START */}
          <div className={classPrefix + "mug"}>
            <div className={classPrefix + "mug__handle"} />
            <div className={classPrefix + "mug__top"} />
            <div className={classPrefix + "mug__bottom"} />
          </div>
          {/* MUG END */}
        </div>
      </div>
    </>
  );
};
