import { FiEdit, FiTrash2 } from "react-icons/fi";
import moment from "moment";

const TrainList = ({ trains, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto -mx-2 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Train Details
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trains.map((train) => (
                <tr key={train._id}>
                  <td className="px-2 sm:px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {train.trainNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      {train.trainName}
                    </div>
                    <div className="text-sm text-gray-500 sm:hidden">
                      {train.source} → {train.destination}
                    </div>
                    <div className="text-sm text-gray-500 sm:hidden">
                      {moment(train.departureTime).format("lll")}
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {train.source} → {train.destination}
                    </div>
                    <div className="text-sm text-gray-500">
                      Duration: {train.duration}
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {moment(train.departureTime).format("lll")}
                    </div>
                    <div className="text-sm text-gray-500">
                      {train.daysOfWeek.join(", ")}
                    </div>
                  </td>
                  <td className="px-2 sm:px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        train.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : train.status === "Delayed"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {train.status}
                    </span>
                  </td>
                  <td className="px-2 sm:px-6 py-4">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onEdit(train)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onDelete(train._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainList;
