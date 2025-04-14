import { useState, useEffect, useRef } from "react";
import Item from "../smallerComponents/Item";
import LongPressFunctionalities from "../smallerComponents/LongPressFunctionalities";

function List({
  goalObj,
  onActiveScreen,
  onSelectedId,
  onDeleteGoal,
  goalPercentage,
}) {
  const [isLongPress, setIsLongPress] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const listItemRef = useRef(null);
  const longPressTimer = useRef(null);
  const startPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isLongPress) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    () => document.body.classList.remove("overflow-hidden");
  }, [isLongPress]);

  function handleLongPressStart(event) {
    startPosition.current = { x: event.clientX, y: event.clientY };

    longPressTimer.current = setTimeout(() => {
      if (listItemRef.current) {
        const rect = listItemRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
        setIsLongPress(true);
      }
    }, 700);
  }

  function handlePointerMove(event) {
    // for if user moves finger significantly, cancel the long press
    const deltaX = Math.abs(event.clientX - startPosition.current.x);
    const deltaY = Math.abs(event.clientY - startPosition.current.y);

    if (deltaX > 5 || deltaY > 5) {
      clearTimeout(longPressTimer.current);
    }
  }

  function handleLongPressEnd(event) {
    event.stopPropagation();
    clearTimeout(longPressTimer.current);
  }

  return (
    <div className="relative">
      {isLongPress && (
        <AnimatePresence>
          {/* this is the overlay when longpress happens */}
          <LongPressFunctionalities setIsLongPress={setIsLongPress} />
        </AnimatePresence>
      )}

      {/* acts as a placeholder for the item/list when it is being long pressed cos position absolute takes it out of document flow, so to prevent the other list from trying to fill up the space */}
      {isLongPress && (
        <div
          style={{
            height: position.height,
            width: "100%",
            background: "transparent",
            visibility: "hidden",
          }}
        ></div>
      )}

      <Item
        isLongPress={isLongPress}
        onDeleteGoal={onDeleteGoal}
        goalObj={goalObj}
        listItemRef={listItemRef}
        position={position}
        onLongPressStart={handleLongPressStart}
        onPointerMove={handlePointerMove}
        onLongPressEnd={handleLongPressEnd}
        onSelectedId={onSelectedId}
        onActiveScreen={onActiveScreen}
        goalPercentage={goalPercentage}
      />
    </div>
  );
}

export default List;
