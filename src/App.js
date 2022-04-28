import { useCallback } from "react";

import Cell from "./component/Cell";
import { numToColumn } from "./utility/stringFunctions";
import { deepCopyArray } from "./utility/arrayFunctions";
import { useState } from "react";
import ContextMenu from "./component/ContextMenu";
import sortIcon from "./assets/images/sort-icon.png";
import "./App.css";

const INITIAL = 10;
const SORT_PROPS = {
  colIndex: null,
  sortType: null, // 0 for ascending and 1 for descending
};

function App() {
  const [gridData, setGridData] = useState(
    Array(INITIAL).fill('').map(() => Array(INITIAL).fill(''))
  );
  const [xPos, setXPos] = useState("0px");
  const [yPos, setYPos] = useState("0px");
  const [showMenu, setShowMenu] = useState(false);
  const [menuIndex, setMenuIndex] = useState(null);
  const [sortProps, setSortProps] = useState(SORT_PROPS);

  const handleChange = (value, x, y) => {
    let d = deepCopyArray(gridData);
    d[x][y] = value;
    setGridData(d);
  };

  const openContextMenu = useCallback(
    (e, i) => {
      e.preventDefault();
      setXPos(`${e.pageX}px`);
      setYPos(`${e.pageY}px`);
      setMenuIndex(i);
      setShowMenu(true);
    },
    [setXPos, setYPos]
  );
  const closeContextMenu = useCallback(() => {
    showMenu && setShowMenu(false);
  }, [showMenu]);

  const insertCol = (rightOrLeft) => {
    let indextoAdd;
    indextoAdd = menuIndex;
    if (rightOrLeft === "left") {
      indextoAdd -= 1;
    }
    let data = deepCopyArray(gridData);
    data.forEach((row, index) => {
      data[index].splice(indextoAdd + 1, 0, "");
    });
    setGridData(data);
  };

  const sortByCol = (i) => {
    let data = deepCopyArray(gridData);
    let newSortProps = SORT_PROPS;
    newSortProps.colIndex = i;
    
    if (sortProps.colIndex === i && sortProps.sortType === 0) {
      // if it's not descending, make it descending
      data.sort((a, b) => (a[i] === b[i] ? 0 : a[i] < b[i] ? 1 : -1));
      newSortProps.sortType = 1;
    } else {
      data.sort((a, b) => (a[i] === b[i] ? 0 : a[i] < b[i] ? -1 : 1));
      newSortProps.sortType = 0;
    }
    setGridData(data);
    setSortProps(newSortProps);
  };

  return (
    <div className="App" onClick={closeContextMenu}>
      <ContextMenu {...{ xPos, yPos, showMenu }} handleClick={insertCol} />
      <section className="col-names-row">
        <div className="cell"></div>
        {gridData[0].map((r, i) => (
          <div
            onContextMenu={(e) => openContextMenu(e, i)}
            className="cell"
            onClick={() => sortByCol(i)}
          >
            {numToColumn(i + 1)}
            {sortProps.colIndex === i && (
              <img
                className={`sort-icon ${
                  sortProps.sortType === 0 && "invert-img"
                }`}
                src={sortIcon}
                alt="Col sort"
              />
            )}
          </div>
        ))}
      </section>
      {gridData.map((row, rowIndex) => (
        <div className="row">
          <input value={rowIndex + 1} className="cell" readOnly />
          {row.map((col, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              {...{ rowIndex, colIndex }}
              value={col}
              onChangeVal={handleChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
