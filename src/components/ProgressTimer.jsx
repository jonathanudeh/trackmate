import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../customHooks/useLocalStorage";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use"; //for confetti to match screen size
import CircularProgress from "../smallerComponents/CircularProgress";
import LineProgressBar from "../smallerComponents/LineProgressBar";

// to do: since user will be able to complete a goal more than once, if they click the start button to start again set isCompleted to false

function ProgressTimer({
  selectedId,
  goalList,
  onActiveScreen,
  onGoalList,
  frequencyDisplay,
  onUpdateStreak,
  streak,
}) {
  const [timer, setTimer] = useLocalStorage(`timer-${selectedId}`, 0);
  const [isTimerRunning, setIsTimerRunning] = useLocalStorage(
    `isTimerRunning-${selectedId}`,
    false
  );
  const [breakProgress, setBreakProgress] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize(); // getting screen size for confetti use

  const timeInMinute = timer / 60;

  const intervalRef = useRef(null);

  let goalToDisplay = goalList.find((goal) => goal?.id === selectedId);

  useEffect(
    function () {
      if (isTimerRunning) {
        intervalRef.current = setInterval(
          () => setTimer((currTime) => currTime + 1),
          1000
        );
      } else {
        clearInterval(intervalRef.current);
      }

      return () => clearInterval(intervalRef.current);
    },
    [isTimerRunning, setTimer, selectedId]
  );

  function handleTimerStartStop() {
    if (isTimerRunning) {
      handleSaveProgress();
    }

    // setting goal is completed to false here cos even after the user completes it if they decide to run it again they'll have to click the timer and once the timer is clicked whether at the beginning or after completing a goal it mean the goal is not completed
    onGoalList((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === selectedId
          ? {
              ...goal,
              isCompleted: false,
            }
          : goal
      )
    );

    setIsTimerRunning((prev) => !prev);
  }

  const handleSaveProgress = useCallback(() => {
    const today = new Date().toLocaleDateString("en-CA");

    const goalToUpdate = goalList.find((goal) => goal.id === selectedId);

    if (!goalToDisplay.target) return;

    const newTime = Math.floor(
      (goalToUpdate.logs?.[today] || 0) + timeInMinute
    );

    const newPercentage = Math.min(
      Math.floor((timeInMinute / goalToUpdate.target) * 100),
      100
    ); // prevents its from exceeding 100

    const newBreakIncrement = goalToUpdate.breaksBeforeCompletion + 1;

    setBreakProgress((prevProgress) => [...prevProgress, newPercentage]);

    //updating the users log and percentage
    onGoalList((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === selectedId
          ? {
              ...goal,
              logs: {
                ...goal.logs,
                [today]: newTime,
              },
              goalProgressPercentage: newPercentage,
              breaksBeforeCompletion: newBreakIncrement,
            }
          : goal
      )
    );
  }, [goalList, goalToDisplay.target, onGoalList, selectedId, timeInMinute]);

  function handleExit() {
    handleTimerStartStop(); // saving progress before leaving
    setIsTimerRunning(false);
    clearInterval(intervalRef.current); // clearinterval BL
    localStorage.removeItem(`isTimerRunning-${selectedId}`);

    onActiveScreen("home");
  }

  const date = new Date();
  let formattedDate;

  if (frequencyDisplay === "daily") {
    formattedDate = date.toDateString().split(" ").slice(0, 3).join(" ");
  } else if (frequencyDisplay === "monthly") {
    formattedDate = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  } else if (frequencyDisplay === "yearly") {
    formattedDate = date.getFullYear().toString();
  }

  useEffect(
    function () {
      if (goalToDisplay?.target && timeInMinute >= goalToDisplay.target) {
        clearInterval(intervalRef.current);
        setTimer(0);
        setIsTimerRunning(false);
        localStorage.removeItem(`timer-${selectedId}`);
        localStorage.removeItem(`isTimerRunning-${selectedId}`);
        handleSaveProgress();
        setShowConfetti(true); // to trigger confetti
        setTimeout(() => setShowConfetti(false), 7000);

        //streak logic will go here
        onUpdateStreak();

        // update the isCompleted key
        onGoalList((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === selectedId
              ? {
                  ...goal,
                  isCompleted: true,
                }
              : goal
          )
        );
      }
    },
    [
      goalToDisplay?.target,
      setIsTimerRunning,
      setTimer,
      timer,
      timeInMinute,
      handleSaveProgress,
      selectedId,
      onUpdateStreak,
      onGoalList,
    ]
  );

  return (
    <div className="relative min-h-screen max-h-screen">
      <div className="relative min-h-[68vh] md:min-h-[65vh] md:max-h-[65vh] rounded-b-4xl -mb-10 z-10 bg-white">
        <div className="flex min-h-15 items-center justify-center  text-center px-4 pt-6 mb-3 ">
          <button
            className="cursor-pointer  h-10 flex items-center justify-center"
            onClick={() => handleExit()}
          >
            <img src="/src/assets/arrow-back.svg" alt="Back arrow" />
          </button>
          <h2 className=" text-3xl font-bold text-blue-900 mx-auto">
            {goalToDisplay?.description}
          </h2>
        </div>

        <div className="min-h-15 flex flex-col items-center justify-center">
          {frequencyDisplay === "daily" && (
            <h2 className="text-2xl font-bold text-blue-900">Today</h2>
          )}
          {frequencyDisplay === "monthly" && <h2>Month</h2>}
          {frequencyDisplay === "yearly" && <h2>Today</h2>}
          <span className="text-blue-900 text-lg font-medium">
            {formattedDate}
          </span>
        </div>

        {showConfetti && (
          <ReactConfetti width={width} height={height} numberOfPieces={300} />
        )}

        {/* <div>
        <p>
          {Math.floor(timer / 60)} min {timer % 60} sec
        </p>
        </div> */}

        <div className="flex flex-col items-center justify-center h-70">
          <CircularProgress
            time={timeInMinute}
            totalTime={goalToDisplay?.target}
          />
          <button
            className="-mt-4 text-center bg-blue-900 p-2 w-35 text-white text-2xl rounded-3xl shadow-lg font-bold cursor-pointer"
            onClick={handleTimerStartStop}
          >
            {isTimerRunning ? "Stop" : "Start"}
          </button>
        </div>
      </div>

      <div
        className="bg-[#FFAF00] relative w-full min-h-[40vh] p-6 max-h-[40vh] overflow-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {/* placeholder to prevent the bars frombeing hidden */}
        <div className="w-full h-15"></div>

        {breakProgress.map((progress, i) => (
          <LineProgressBar
            key={i}
            title={goalToDisplay.title}
            progress={progress}
            width={`${progress}%`}
          />
        ))}

        <button
          className="absolute right-10 bottom-10 text-white cursor-pointer font-bold text-3xl border-[1px] drop-shadow-lg  shadow-2xl rounded-lg w-20 h-20"
          onClick={() => onActiveScreen("stats")}
        >
          <span>🔥</span>
          {streak}
        </button>
      </div>
    </div>
  );
}

export default ProgressTimer;
