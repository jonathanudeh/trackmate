import HeaderNavigation from "./components/HeaderNavigation";
import GoalListLayout from "./components/GoalListLayout";
import { useState } from "react";
import ProgressTimer from "./components/ProgressTimer";
import { useLocalStorage } from "./customHooks/useLocalStorage";
import StreakCalendar from "./components/StreakCalender";
import Statistics from "./components/Statistics";
import StatisticsHeaderNav from "./components/statisticsHeaderNav";
import StatisticsMainBody from "./components/stattisticsMainBody";

function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [frequencyDisplay, setFrequencyDisplay] = useState("daily");
  const [goalList, setGoalList] = useLocalStorage("goals", []);
  const [deletedGoals, setDeletedGoals] = useLocalStorage("deletedGoals", []); // this is to give full statistics, so I keep records of even deleted goals
  const [selectedId, setSelectedId] = useState(null);
  const [streakDays, setStreakDays] = useLocalStorage("streakDays", []);
  const [streak, setStreak] = useLocalStorage("streakCount", 0);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  //streak logic
  function handleUpdateStreak() {
    const today = new Date().toLocaleDateString("en-CA");

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedYesterday = yesterday.toLocaleDateString("en-CA"); // to match today date format for comaparism which was used to set yessterday streakday if the streakday is not today

    if (streakDays.includes(today)) return; // to make sure streak can only be counted once in a day. this kicks in only after the codes below has ran once for today

    setStreakDays((prevDays) => [...prevDays, today]); // sets streakday to today for tomorrow's check

    if (streakDays.includes(formattedYesterday)) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(1);
    }
  }

  return (
    <div className="md:max-h-screen">
      {activeScreen === "home" && (
        <div className="w-full md:hidden">
          <Home
            onActiveScreen={setActiveScreen}
            onGoalList={setGoalList}
            goalList={goalList}
            onSelectedId={setSelectedId}
            onFrequencyDisplay={setFrequencyDisplay}
            frequencyDisplay={frequencyDisplay}
            onDeletedGoals={setDeletedGoals}
            streak={streak}
          />
        </div>
      )}
      {activeScreen === "progress" && (
        <div className="w-full md:hidden">
          <ProgressScreen
            onActiveScreen={setActiveScreen}
            selectedId={selectedId}
            goalList={goalList}
            onGoalList={setGoalList}
            frequencyDisplay={frequencyDisplay}
            onUpdateStreak={handleUpdateStreak}
            streak={streak}
          />
        </div>
      )}

      {activeScreen === "stats" && (
        <div className="w-full md:hidden">
          <StatsScreen
            streakDays={streakDays}
            goalList={goalList}
            deletedGoals={deletedGoals}
            frequencyDisplay={frequencyDisplay}
            onFrequencyDisplay={setFrequencyDisplay}
            onSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            onActiveScreen={setActiveScreen}
          />
        </div>
      )}

      <div className="hidden md:flex md:flex-row md:max-h-screen">
        {/* Sidebar (Only Visible on Desktop) */}
        <nav className="relative hidden md:block w-1/5 bg-pink-500 text-black p-4 min-h-screen md:max-h-screen">
          <h2 className="mt-7 mb-1 text-center font-bold text-lg">
            Goal & Habit Tracker
          </h2>
          <HeaderNavigation
            header="Welcome!"
            message="My goal list"
            onFrequencyDisplay={setFrequencyDisplay}
            frequencyDisplay={frequencyDisplay}
            activeScreen={activeScreen}
            streak={streak}
            onActiveScreen={setActiveScreen}
          />
        </nav>

        {/* Main Content */}
        <main className="w-full md:w-3/5 max-h-screen">
          {activeScreen === "home" && (
            <GoalListLayout
              onActiveScreen={setActiveScreen}
              onGoalList={setGoalList}
              goalList={goalList}
              onSelectedId={setSelectedId}
              frequencyDisplay={frequencyDisplay}
              onDeletedGoals={setDeletedGoals}
            />
          )}

          {activeScreen === "progress" && (
            <div className="w-full md:w-5/5">
              <ProgressScreen
                onActiveScreen={setActiveScreen}
                selectedId={selectedId}
                goalList={goalList}
                onGoalList={setGoalList}
                frequencyDisplay={frequencyDisplay}
                onUpdateStreak={handleUpdateStreak}
                streak={streak}
              />
            </div>
          )}

          {activeScreen === "stats" && (
            <div className="w-full  ">
              <StatsScreen
                streakDays={streakDays}
                goalList={goalList}
                deletedGoals={deletedGoals}
                frequencyDisplay={frequencyDisplay}
                onFrequencyDisplay={setFrequencyDisplay}
                onSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                onActiveScreen={setActiveScreen}
              />
            </div>
          )}
        </main>

        {/* Sidebar for Extra Info (Only Desktop) */}
        <aside className="hidden md:block w-1/5  p-4 bg-blue-500 md:max-h-screen">
          <Statistics
            goalList={goalList}
            deletedGoals={deletedGoals}
            frequencyDisplay={frequencyDisplay}
            selectedDate={selectedDate}
            aside={true}
          />
        </aside>
      </div>
    </div>
  );
}

function Home({
  onActiveScreen,
  onGoalList,
  goalList,
  onSelectedId,
  onFrequencyDisplay,
  frequencyDisplay,
  onDeletedGoals,
  streak,
}) {
  return (
    <div className="relative">
      <HeaderNavigation
        header="Welcome!"
        message="My goal list"
        onFrequencyDisplay={onFrequencyDisplay}
        frequencyDisplay={frequencyDisplay}
        streak={streak}
        onActiveScreen={onActiveScreen}
      />
      <GoalListLayout
        onActiveScreen={onActiveScreen}
        onGoalList={onGoalList}
        goalList={goalList}
        onSelectedId={onSelectedId}
        frequencyDisplay={frequencyDisplay}
        onDeletedGoals={onDeletedGoals}
      />
    </div>
  );
}

function ProgressScreen({
  onActiveScreen,
  selectedId,
  goalList,
  onGoalList,
  frequencyDisplay,
  onUpdateStreak,
  streak,
}) {
  return (
    <div>
      <ProgressTimer
        selectedId={selectedId}
        goalList={goalList}
        onActiveScreen={onActiveScreen}
        onGoalList={onGoalList}
        frequencyDisplay={frequencyDisplay}
        onUpdateStreak={onUpdateStreak}
        streak={streak}
      />
    </div>
  );
}

function StatsScreen({
  streakDays,
  goalList,
  deletedGoals,
  frequencyDisplay,
  onFrequencyDisplay,
  onSelectedDate,
  selectedDate,
  onActiveScreen,
}) {
  return (
    <div className="md:max-h-screen ">
      <StatisticsHeaderNav
        header={["Year ", "Month ", "Today "]}
        frequencyDisplay={frequencyDisplay}
        onFrequencyDisplay={onFrequencyDisplay}
        onActiveScreen={onActiveScreen}
      />
      <StatisticsMainBody
        goalList={goalList}
        deletedGoals={deletedGoals}
        streakDays={streakDays}
        frequencyDisplay={frequencyDisplay}
        onSelectedDate={onSelectedDate}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default App;
