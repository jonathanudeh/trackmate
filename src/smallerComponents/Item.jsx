import { AnimatePresence, motion } from "framer-motion";

function Item({
  isLongPress,
  onDeleteGoal,
  goalObj,
  listItemRef,
  position,
  onLongPressStart,
  onPointerMove,
  onLongPressEnd,
  onSelectedId,
  onActiveScreen,
}) {
  return (
    <div
      className={`"w-full relative cursor-pointer ${
        isLongPress && "-top-19"
      } rounded-lg"`}
    >
      {isLongPress && (
        <button
          className={`bg-red-600 text-white text-lg font-bold absolute -top-13 right-1 p-1 rounded-lg z-40 select-none cursor-pointer`}
          onClick={() => onDeleteGoal(goalObj.id)}
        >
          {/* dummy use of motion to avoid errors being thrown */}
          {console.log(typeof motion)}
          <img
            src="/assets/delete-icon.svg"
            alt="Delete Icon"
            className="w-8 h-8"
          />
        </button>
      )}
      <motion.li
        ref={listItemRef}
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: isLongPress ? 1.05 : 1,
          position: isLongPress ? "absolute" : "static",
          top: isLongPress ? "auto" : "auto",
          left: isLongPress ? "auto" : "auto",
          width: isLongPress ? position.width : "100%",
          zIndex: isLongPress ? 40 : 0, // Ensure it's above overlay
        }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center select-none"
        onPointerDown={onLongPressStart}
        onPointerMove={onPointerMove}
        onPointerUp={onLongPressEnd}
        onClick={(e) => {
          e.stopPropagation();
          onSelectedId(goalObj.id);
          onActiveScreen("progress");
        }}
      >
        <div className="flex-1">
          <h1 className="font-bold text-gray-700 ">{goalObj.title}</h1>
          <p className="text-gray-500 text-sm  max-w-60">
            {goalObj.description}
          </p>
        </div>
        <p className={`text-blue-600 font-bold text-lg`}>
          {goalObj.isGoal && goalObj.goalProgressPercentage}
          {goalObj.isGoal && "%"}
        </p>
      </motion.li>
    </div>
  );
}

export default Item;
