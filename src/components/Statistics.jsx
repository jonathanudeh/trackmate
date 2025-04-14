import { useCallback, useMemo } from "react";

function Statistics({
  goalList,
  deletedGoals,
  frequencyDisplay,
  selectedDate,
  aside,
}) {
  // goal list to display by date created full deets of this function in the goallistlayout component
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

  //
  const handleCalculate = useCallback(
    (filterPeriod, dateSelected = null) => {
      const allGoals = [...goalList, ...deletedGoals];
      const today = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD"

      // if dateSelected is is not given then targetdate is today
      const targetDate = dateSelected || today; // "YYYY-MM-DD"

      const targetMonth = targetDate.slice(0, 7); // "YYYY-MM"
      const targetYear = targetDate.slice(0, 4); // "YYYY"

      const filteredGoals = allGoals.filter((goal) => {
        if (filterPeriod === "daily") {
          return goal.createdAt === targetDate;
        } else if (filterPeriod === "monthly") {
          return goal.createdAt.startsWith(targetMonth);
        } else if (filterPeriod === "yearly") {
          return goal.createdAt.startsWith(targetYear);
        }
      });

      const totalMinutes = filteredGoals.reduce((sum, goal) => {
        const logsObjToArray = Object.entries(goal.logs || {});

        const filteredLogsByperiod = logsObjToArray
          .filter(([date]) => {
            if (filterPeriod === "daily") return date === targetDate;
            if (filterPeriod === "monthly") return date.startsWith(targetMonth);
            if (filterPeriod === "yearly") return date.startsWith(targetYear);
            return false;
          })
          .map(([, minutes]) => minutes);

        const totalLoggedMinutes = filteredLogsByperiod.reduce(
          (loggedSum, minutes) => loggedSum + minutes,
          0
        );

        return sum + totalLoggedMinutes;
      }, 0);

      const completedGoals = filteredGoals.filter((goal) => goal.isCompleted); // return if goal completed is true

      const toalGoalsProgressPercentage = filteredGoals.reduce(
        (sum, goal) => sum + (goal.goalProgressPercentage || 0),
        0
      );
      const totalGoals = filteredGoals.length;
      const statsPercentage =
        totalGoals > 0 ? toalGoalsProgressPercentage / totalGoals : 0;

      return {
        total: totalGoals,
        completedGoals: completedGoals.length,
        statsPercentage: Math.floor(statsPercentage),
        hours: Math.floor(totalMinutes / 60),
        minutes: totalMinutes % 60,
      };
    },
    [goalList, deletedGoals]
  );

  const { statsPercentage, hours, minutes } = useMemo(
    () => handleCalculate(frequencyDisplay, selectedDate),
    [handleCalculate, frequencyDisplay, selectedDate]
  );

  return (
    <div className=" w-full px-3 mb-5">
      <ul
        className={`w-full space-y-2 py-2 flex-grow max-h-39 mb-5 ${
          aside ? "md:max-h-125 md:h-125" : ""
        }  md:mb-10 overflow-y-scroll`}
        style={{ scrollbarWidth: "none" }}
      >
        {goalListByFrequency.map((goal) => (
          <List key={goal.id} goalObj={goal} />
        ))}
      </ul>

      <h1 className="font-bold text-blue-800 text-2xl md:text-white">
        Your progress
      </h1>
      <p className="text-yellow-500 text-lg font-bold md:text-white">
        {hours >= 1 && hours + "hr"}
        {hours >= 1 && ":"}
        {minutes && minutes + "min"}
        {!minutes && "hr"}/
        <span>{frequencyDisplay === "daily" && "Today"}</span>
        <span>{frequencyDisplay === "monthly" && "Month"}</span>
        <span>{frequencyDisplay === "yearly" && "Year"}</span>
      </p>

      {/* {total !== completedGoals && (
        <p>
          You completed {completedGoals} out of {total}
        </p>
      )}
      {total === completedGoals && (
        <p>You've complteted all {completedGoals} Goals 🔥</p>
      )} */}

      <p className="md:text-white">
        <b>{statsPercentage}%</b> of your goals
      </p>
    </div>
  );
}

function List({ goalObj }) {
  return (
    <li className="w-full bg-gray-100 p-2 rounded-lg shadow flex justify-between items-center select-none">
      <div className="flex-1">
        <h1 className="font-bold text-blue-800 text-lg ">{goalObj.title}</h1>
      </div>
      <p className={`text-blue-600 font-bold text-lg`}>
        {goalObj.goalProgressPercentage}%
      </p>
    </li>
  );
}

export default Statistics;
