import arrowIcon from "../assets/images/arrow.png";
export default function ContextMenu({ showMenu, xPos, yPos, handleClick }) {
  return showMenu ? (
    <ul
      className="context-menu"
      style={{
        top: yPos,
        left: xPos,
      }}
    >
      <li onClick={() => handleClick("left")}>
        <img src={arrowIcon} alt="arrow icon" className="ic-context-menu" /> Add to Left
      </li>
      <li onClick={() => handleClick("right")}>
        <img src={arrowIcon} alt="arrow icon" className="ic-context-menu add-right" /> Add to Right
      </li>
    </ul>
  ) : null;
}
