import { useState } from "react";
import { motion } from "framer-motion";
import FloatingLabelInput from "../smallerComponents/FloatingLabelInput";
import FloatingLabelSelect from "../smallerComponents/FloatingLabelSelect";

// const demoData = {
//   id: "1234",
//   title: "run",
//   description: "lose 10kg",
//   frequency: "daily",
//   target: 30,
//   units: "minutes",
//   createdAt: new Date().toLocalDateString("en-CA"),
//   streak: 0,
// };

function AddGoal({ onAddGoal, onIsAddGoalShowing }) {
  // const [isGoal, setIsGoal] = useState(true);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [targetUnit, setTargetUnit] = useState("minute");
  const [goalFrequency, setGoalFrequency] = useState("");

  function handleAddGoal() {
    if (!goalTitle || !goalDescription || !goalTarget || !Number(goalTarget))
      return;

    const newGoal = {
      id: new Date().getTime(),
      title: goalTitle.charAt(0).toUpperCase() + goalTitle.slice(1),
      description:
        goalDescription.charAt(0).toUpperCase() + goalDescription.slice(1),
      target: Number(goalTarget) * (targetUnit === "Hour" ? 60 : 1), //converting to minutes always
      targetUnit: "minutes", // always in unit cos target gets converted and calc is done in minutes
      createdAt: new Date().toLocaleDateString("en-CA"),
      isCompleted: false,
      frequency: goalFrequency || "daily",
      logs: {},
      streak: 0,
      goalProgressPercentage: 0,
      isGoal: true,
      breaksBeforeCompletion: 0,
    };
    onAddGoal(newGoal);

    //for when isGoal is false (feature to come)
    // const newHabit = {
    //   id: new Date().getTime(),
    //   title: goalTitle.charAt(0).toUpperCase() + goalTitle.slice(1),
    //   description:
    //     goalDescription.charAt(0).toUpperCase() + goalDescription.slice(1),
    //   createdAt: new Date().toLocaleDateString("en-CA"),
    //   isCompleted: false,
    //   frequency: "daily",
    //   logs: {},
    //   isGoal: false,
    // };
    // onAddGoal(newHabit);

    console.log(typeof motion); // dummy use for eslint to stop giving me motion not used error
  }

  const isRequiredEmpty =
    !goalTitle ||
    !goalDescription ||
    !goalTarget ||
    goalTarget < 1 ||
    !Number(goalTarget); //to either disable or enable the add btn

  return (
    <motion.div
      className="fixed top-0 w-full inset-0 bg-[rgba(246,51,154,0.7)] h-screen flex items-center justify-center md:p-25"
      onClick={() => onIsAddGoalShowing(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 10 }}
        className="bg-white w-80 md:w-200 md:px-15 space-y-4 rounded-4xl flex flex-col items-center justify-between text-black p-6 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full space-y-2">
          <p className="font-bold text-2xl text-center ">Goal To Crush</p>
          {/* <div className="flex gap-5">
            <p
              className={`cursor-pointer `}
              onClick={() => setIsGoal(true)}
            >
              Goal
            </p>
            <p
              className={`cursor-pointer ${!isGoal && " border-b-2"}`}
              onClick={() => setIsGoal(false)}
            >
              Habit
            </p>
          </div> */}
        </div>

        <>
          <FloatingLabelInput
            label="Title"
            setValue={setGoalTitle}
            value={goalTitle}
          />
          <FloatingLabelInput
            label="Description"
            setValue={setGoalDescription}
            value={goalDescription}
          />
          <FloatingLabelInput
            label="Target"
            setValue={setGoalTarget}
            value={goalTarget}
            extraInfo="(30 mins)"
          />

          <FloatingLabelSelect
            label="Target Unit (optional)"
            options={["Minute", "Hour"]}
            setValue={setTargetUnit}
            value={targetUnit}
          />

          <FloatingLabelSelect
            label="Frequency (optional)"
            options={["Daily", "Monthly", "Yearly"]}
            setValue={setGoalFrequency}
            value={goalFrequency}
          />
        </>

        {/* {!isGoal && (
          <>
            <FloatingLabelInput
              label="Title"
              setValue={setGoalTitle}
              value={goalTitle}
            />
            <FloatingLabelInput
              label="Description"
              setValue={setGoalDescription}
              value={goalDescription}
            />
          </>
        )} */}

        <div className="w-full flex items-center justify-center space-x-10">
          <button
            className="hidden md:block w-full md:w-100 h-12 bg-black text-white text-lg font-bold rounded-4xl cursor-pointer"
            onClick={() => onIsAddGoalShowing(false)}
          >
            Close
          </button>

          <button
            className={`w-full md:w-100 h-12 bg-pink-500 rounded-4xl font-bold text-lg  ${
              isRequiredEmpty ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={handleAddGoal}
            disabled={isRequiredEmpty}
          >
            Add
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AddGoal;
