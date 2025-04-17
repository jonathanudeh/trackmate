import { useEffect, useState } from "react";
import AddGoal from "./AddGoalPopUp";
import { AnimatePresence, motion } from "framer-motion";
import AddBtn from "../smallerComponents/AddBtn";
import List from "../smallerComponents/List";

function GoalListLayout({
  onActiveScreen,
  goalList,
  onGoalList,
  onSelectedId,
  frequencyDisplay,
  onDeletedGoals,
}) {
  const [isAddGoalShowing, setIsAddGoalShowing] = useState(false);

  function handleUpdateGoal(newGoal) {
    setIsAddGoalShowing(false);
    setTimeout(() => {
      onGoalList((prevGoals) => [...prevGoals, newGoal]);
    }, 400);

    console.log(typeof motion); // dummy use for eslint to stop screaming at me
  }

  function handleDeleteGoal(id) {
    const goalToDelete = goalList.find((goal) => goal.id === id);
    if (goalToDelete) {
      onDeletedGoals((prevGoals) => [...prevGoals, goalToDelete]); // storing the deleted goal in and array in localStorage
    }

    //deleting the selected goalfrom the UI
    onGoalList((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  }

  // this is where i sort the list to display it depending on whether today month or year is active and i also automatically arrange goals. What i mean is after a goal has been set today the next day it will no longer be under today but move to month and subsequenctly year but the frequency key in the goal object still remain same
  const today = new Date().toLocaleDateString("en-CA");
  const currMonth = new Date().getMonth() + 1;
  const currYear = new Date().getFullYear();

  const sortedGoals = [...goalList].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const todayGoals = sortedGoals.filter((goal) => goal.createdAt === today);
  const monthlyGoals = sortedGoals.filter(
    (goal) =>
      goal.createdAt !== today &&
      new Date(goal.createdAt).getMonth() + 1 === currMonth &&
      new Date(goal.createdAt).getFullYear() === currYear
  );
  const yearlyGoals = sortedGoals.filter(
    (goal) =>
      new Date(goal.createdAt).getFullYear() === currYear &&
      !todayGoals.includes(goal) &&
      !monthlyGoals.includes(goal)
  );

  let goalListByFrequency;

  if (frequencyDisplay === "daily") goalListByFrequency = todayGoals;
  if (frequencyDisplay === "monthly") goalListByFrequency = monthlyGoals;
  if (frequencyDisplay === "yearly") goalListByFrequency = yearlyGoals;

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
      if (isAddGoalShowing) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }

      () => document.body.classList.remove("overflow-hidden");
    },
    [isAddGoalShowing]
  );

  return (
    <div className="relative z-10 min-h-[65vh] md:min-h-screen md:max-h-screen md:mb-22 bg-white rounded-t-4xl -mt-8 p-6 flex flex-col items-center justify-between gap-4 mb-20">
      <h1 className="text-pink-600 font-bold text-lg text-center md:pt-5">
        {formattedDate}
      </h1>

      <ul
        className="w-full mt-4 space-y-4 flex-grow md:overflow-y-scroll "
        style={{ scrollbarWidth: "none" }}
      >
        <AnimatePresence>
          {goalListByFrequency.map((goal) => (
            <List
              key={goal.id}
              goalObj={goal}
              onActiveScreen={onActiveScreen}
              onSelectedId={onSelectedId}
              onDeleteGoal={handleDeleteGoal}
            />
          ))}
        </AnimatePresence>
      </ul>

      <AddBtn setIsAddGoalShowing={setIsAddGoalShowing} />

      <AnimatePresence>
        {isAddGoalShowing && (
          <AddGoal
            onIsAddGoalShowing={setIsAddGoalShowing}
            onAddGoal={handleUpdateGoal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default GoalListLayout;
