const TrainClassForm = ({
  classes,
  onClassChange,
  onAddClass,
  onRemoveClass,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Classes</h3>
        {classes.length < 6 && (
          <button
            type="button"
            onClick={onAddClass}
            className="text-blue-600 hover:text-blue-900 text-sm"
          >
            Add Class
          </button>
        )}
      </div>
      {classes.map((cls, index) => (
        <div key={index} className="p-3 border rounded-lg">
          <div>
            <label className="block text-xs text-gray-500">Class Name</label>
            <select
              value={cls.name}
              onChange={(e) => onClassChange(index, "name", e.target.value)}
              className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="1A">1A</option>
              <option value="2A">2A</option>
              <option value="3A">3A</option>
              <option value="SL">SL</option>
              <option value="CC">CC</option>
              <option value="2S">2S</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500">Fare</label>
            <input
              type="number"
              value={cls.fare}
              onChange={(e) => onClassChange(index, "fare", e.target.value)}
              className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm p-2"
              required
              min="1"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Total Seats</label>
            <input
              type="number"
              value={cls.totalSeats}
              onChange={(e) =>
                onClassChange(index, "totalSeats", e.target.value)
              }
              className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm p-2"
              required
              min="1"
            />
          </div>
          {classes.length > 1 && (
            <button
              type="button"
              onClick={() => onRemoveClass(index)}
              className="mt-2 text-red-600 text-sm"
            >
              Remove Class
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TrainClassForm;
