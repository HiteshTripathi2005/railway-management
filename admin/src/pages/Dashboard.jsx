import { useState, useEffect } from "react";
import axios from "axios";
import { MdPeople, MdTrain, MdConfirmationNumber } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";

const API_URL = "http://localhost:5000/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalTrains: 0,
    recentBookings: [],
  });
  const [bookingStats, setBookingStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsResponse, bookingStatsResponse] = await Promise.all([
          axios.get(`${API_URL}/admin/stats`),
          axios.get(`${API_URL}/admin/booking-stats`),
        ]);

        setStats(statsResponse.data.data);
        setBookingStats(bookingStatsResponse.data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} text-white mr-4`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={MdPeople}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Trains"
          value={stats.totalTrains}
          icon={MdTrain}
          color="bg-green-500"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={MdConfirmationNumber}
          color="bg-purple-500"
        />
        <StatCard
          title="Revenue"
          value={`₹${bookingStats.reduce(
            (acc, stat) => acc + (stat.totalRevenue || 0),
            0
          )}`}
          icon={FaRupeeSign}
          color="bg-yellow-500"
        />
      </div>

      {/* Booking Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Booking Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bookingStats.map((stat) => (
            <div
              key={stat._id}
              className="bg-gray-50 rounded-lg p-4 text-center"
            >
              <p className="text-gray-500">{stat._id}</p>
              <p className="text-xl font-semibold">{stat.count}</p>
              <p className="text-sm text-gray-500">
                Revenue: ₹{stat.totalRevenue}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {stats.recentBookings.map((booking) => (
            <div key={booking._id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{booking.user.name}</p>
                  <p className="text-sm text-gray-500">{booking.user.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{booking.train.trainName}</p>
                  <p className="text-sm text-gray-500">
                    {booking.train.trainNumber}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
