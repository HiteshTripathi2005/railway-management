import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FiEye, FiXCircle } from "react-icons/fi";
import moment from "moment";

const API_URL = "http://localhost:5000/api";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/bookings`);
      setBookings(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.put(`${API_URL}/bookings/${id}/cancel`);
        toast.success("Booking cancelled successfully");
        fetchBookings();
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to cancel booking"
        );
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Waiting":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
      </div>

      {/* Bookings List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PNR Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Train
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Travel Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {booking.pnrNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {booking.user?.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {booking.user?.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {booking.train?.trainName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {booking.train?.trainNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {moment(booking.travelDate).format("DD MMM YYYY")}
                  </div>
                  <div className="text-sm text-gray-500">
                    Class: {booking.class}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleView(booking)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <FiEye className="h-5 w-5" />
                  </button>
                  {booking.status === "Confirmed" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiXCircle className="h-5 w-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Booking Modal */}
      {showModal && selectedBooking && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Booking Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">PNR Number</h4>
                    <p className="text-gray-600">{selectedBooking.pnrNumber}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Train Details</h4>
                    <p className="text-gray-600">
                      {selectedBooking.train?.trainName} (
                      {selectedBooking.train?.trainNumber})
                    </p>
                    <p className="text-gray-600">
                      {selectedBooking.train?.source} →{" "}
                      {selectedBooking.train?.destination}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Travel Details</h4>
                    <p className="text-gray-600">
                      Date:{" "}
                      {moment(selectedBooking.travelDate).format("DD MMM YYYY")}
                    </p>
                    <p className="text-gray-600">
                      Class: {selectedBooking.class}
                    </p>
                    <p className="text-gray-600">
                      Total Fare: ₹{selectedBooking.totalFare}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Passengers</h4>
                    <div className="mt-2">
                      {selectedBooking.passengers.map((passenger, index) => (
                        <div
                          key={index}
                          className="text-sm text-gray-600 border-b border-gray-200 py-2"
                        >
                          <p>Name: {passenger.name}</p>
                          <p>Age: {passenger.age}</p>
                          <p>Gender: {passenger.gender}</p>
                          {passenger.seatNumber && (
                            <p>Seat: {passenger.seatNumber}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
