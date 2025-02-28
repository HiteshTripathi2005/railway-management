const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DaysOfWeekPicker = ({ selectedDays, onDayToggle }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Days of Week
      </label>
      <div className="flex flex-wrap gap-2">
        {DAYS_OF_WEEK.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => onDayToggle(day)}
            className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
              selectedDays.includes(day)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaysOfWeekPicker;
