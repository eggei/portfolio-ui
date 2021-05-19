import React, { Children } from "react";
import "./main.scss";
const classPrefix = "MainScene MainScene__";

export const MainScene = () => {
  return (
    <div className="MainSceneWrapper">
      {/* Order of the element blocks below is important. For example table elements come before wall elements to be able to select one of the wall elements with css sibling selector (+) from hoveer state of one of the table elements  */}

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
  );
};
