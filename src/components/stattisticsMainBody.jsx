import Statistics from "./Statistics";
import StreakCalendar from "./StreakCalender";

function StatisticsMainBody({
  goalList,
  deletedGoals,
  streakDays,
  frequencyDisplay,
  onSelectedDate,
  selectedDate,
}) {
  return (
    <div
      className="relative flex flex-col items-center justify-between gap-4 w-full z-10 min-h-[65vh] md:min-h-screen md:max-h-screen md:mb-22 bg-white rounded-t-4xl -mt-8 md:-mt-10 pr-6- pt-2  md:pt-0  mb-20 overflow-scroll "
      style={{ scrollbarWidth: "none" }}
    >
      <h1 className="font-bold text-blue-800 text-3xl pt-5">Target</h1>

      <Statistics
        goalList={goalList}
        deletedGoals={deletedGoals}
        frequencyDisplay={frequencyDisplay}
        selectedDate={selectedDate}
      />
      <StreakCalendar
        streakDays={streakDays}
        onSelectedDate={onSelectedDate}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default StatisticsMainBody;
