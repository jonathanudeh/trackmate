import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function StreakCalendar({ streakDays, onSelectedDate, selectedDate }) {
  const streakSet = new Set(streakDays);

  function handleStreakDays(date) {
    const formattedDate = date.toLocaleDateString("en-CA");
    return streakSet.has(formattedDate); // same as return if streakDays.includes(formattedDate)
  }

  function handleDateChange(date) {
    const formattedDate = date.toLocaleDateString("en-CA");
    onSelectedDate(formattedDate); // to update with selected date
  }

  return (
    <div className="pl-2  flex flex-col justify-center self-start  text-xs   md:w-full md:h-85 md:px-6 pb-2">
      <h2 className="text-xl font-bold mb-2  pl-2 md:text-center">
        Streak Calendar
      </h2>
      <Calendar
        onChange={handleDateChange}
        value={new Date(selectedDate)}
        className="rounded-4xl p-2 font-bold shadow-2xl !w-70 !h-55 !bg-white !text-md md:!w-full md:!h-85"
        tileClassName={({ date, view }) =>
          view === "month" && handleStreakDays(date)
            ? "!bg-green-700 !text-white !h-6 !p-2 rounded-lg shadow-lg flex justify-center items-center md:!h-10 md:!p-4"
            : " !text-black !text-md !h-6 !p-2 flex justify-center items-center md:!h-10 md:!p-4 rounded-lg"
        }
        tileContent={({ date, view }) =>
          view === "month" && handleStreakDays(date) ? (
            <span className="text-xs">🔥</span>
          ) : null
        }
      />
    </div>
  );
}

export default StreakCalendar;
