export default function ContextMenu({ showMenu, xPos, yPos, handleClick }) {

  return showMenu ? (
    <ul
          className="context-menu"
          style={{
            top: yPos,
            left: xPos,
          }}
        >
          <li onClick={() => handleClick('left')}>Add to Left</li>
          <li onClick={() => handleClick('right')}>Add to Right</li>
        </ul>
  ) : null;
}