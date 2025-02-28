import TrainClassForm from "./TrainClassForm";
import DaysOfWeekPicker from "./DaysOfWeekPicker";

const TrainForm = ({
  formData,
  onSubmit,
  onChange,
  onClose,
  loading,
  selectedTrain,
  onClassChange,
  onAddClass,
  onRemoveClass,
  onDayToggle,
}) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-0 sm:p-4">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block w-full sm:max-w-lg align-bottom sm:align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
          <form onSubmit={onSubmit}>
            <div className="bg-white px-3 sm:px-4 pt-4 sm:pt-5 pb-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Train Number
                  </label>
                  <input
                    type="text"
                    value={formData.trainNumber}
                    onChange={(e) => onChange("trainNumber", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Train Name
                  </label>
                  <input
                    type="text"
                    value={formData.trainName}
                    onChange={(e) => onChange("trainName", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Source
                  </label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => onChange("source", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => onChange("destination", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Departure Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.departureTime}
                    onChange={(e) => onChange("departureTime", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Arrival Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.arrivalTime}
                    onChange={(e) => onChange("arrivalTime", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => onChange("duration", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Total Seats
                  </label>
                  <input
                    type="number"
                    value={formData.totalSeats}
                    onChange={(e) => onChange("totalSeats", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                    required
                    min="1"
                  />
                </div>
              </div>

              {/* Classes Section */}
              <TrainClassForm
                classes={formData.classes}
                onClassChange={onClassChange}
                onAddClass={onAddClass}
                onRemoveClass={onRemoveClass}
              />

              {/* Days of Week */}
              <DaysOfWeekPicker
                selectedDays={formData.daysOfWeek}
                onDayToggle={onDayToggle}
              />
            </div>
            <div className="bg-gray-50 px-3 sm:px-4 py-3 flex flex-col sm:flex-row-reverse gap-2 sm:gap-0">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 disabled:opacity-50"
              >
                {loading ? "Saving..." : selectedTrain ? "Update" : "Add"} Train
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrainForm;
