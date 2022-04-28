import { useCallback } from "react";

import Cell from "./component/Cell";
import { numToColumn } from "./utility/stringFunctions";
import { useState } from "react";
import ContextMenu from "./component/ContextMenu";
import "./App.css";

const INITIAL = 10;

function App() {
  const [gridData, setGridData] = useState(
    Array.from(new Array(INITIAL), () => new Array(INITIAL).fill(""))
  );
  const [xPos, setXPos] = useState("0px");
  const [yPos, setYPos] = useState("0px");
  const [showMenu, setShowMenu] = useState(false);
  const [menuIndex, setMenuIndex] = useState(null);

  const handleChange = (value, x, y) => {
    let d = JSON.parse(JSON.stringify(gridData));
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
    indextoAdd = menuIndex
    if(rightOrLeft === 'left') {
      indextoAdd -= 1;
    }
    let data = JSON.parse(JSON.stringify(gridData));
    data.forEach((row, index) => {
      data[index].splice(indextoAdd+1, 0, '');
    })
    setGridData(data);
    console.log(data);
  };

  const sortByCol = () => {
    
  }

  return (
    <div className="App" onClick={closeContextMenu}>
      <ContextMenu {...{ xPos, yPos, showMenu }} handleClick={insertCol} />
      <section className="col-names-row">
        <div className="cell"></div>
        {gridData[0].map((r, i) => (
          <div onContextMenu={(e) => openContextMenu(e, i)} className="cell" onClick={() => sortByCol(i)}>
            {numToColumn(i + 1)}
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
