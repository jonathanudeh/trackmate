import { motion } from "framer-motion";

function LongPressFunctionalities({ setIsLongPress }) {
  console.log(typeof motion); // dummy use of motion to stop it giving error
  return (
    <div
      className="bg-gray-500/30 fixed top-0 min-h-screen w-full inset-0  z-30"
      onClick={() => setIsLongPress(false)}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.1 }}
      ></motion.div>
    </div>
  );
}

export default LongPressFunctionalities;
