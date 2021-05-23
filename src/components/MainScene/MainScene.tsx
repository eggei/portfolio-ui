import React from "react";
import "./styles.scss";
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
          <div className={classPrefix + "mugContainer"}>
            <div className={classPrefix + "mug"}>
              <div className={classPrefix + "mug__top"}>
                <img src="/images/small-brush-b&w.png" />
                <div className={classPrefix + "mug__top__coffee"} />
              </div>
              <div className={classPrefix + "mug__handle"} />
              <div className={classPrefix + "mug__bottom"}>
                <div className={classPrefix + "mug__bottom__shadow"} />
              </div>
            </div>
            <div className={classPrefix + "mug__shadow"}>
              <div className={classPrefix + "mug__shadow__handle"} />
            </div>
          </div>
          {/* MUG END */}
        </div>
      </div>
    </>
  );
};
