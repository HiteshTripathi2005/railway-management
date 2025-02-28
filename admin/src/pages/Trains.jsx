import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import moment from "moment";
import TrainList from "../components/trains/TrainList";
import TrainForm from "../components/trains/TrainForm";

const Trains = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [formData, setFormData] = useState({
    trainNumber: "",
    trainName: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    totalSeats: "",
    classes: [
      {
        name: "1A",
        fare: "",
        totalSeats: "",
        availableSeats: "",
      },
    ],
    daysOfWeek: [],
    status: "Active",
  });

  const fetchTrains = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/trains");
      setTrains(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching trains");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const trainData = {
        ...formData,
        totalSeats: Number(formData.totalSeats),
        classes: formData.classes.map((cls) => ({
          ...cls,
          fare: Number(cls.fare),
          totalSeats: Number(cls.totalSeats),
          availableSeats: Number(cls.totalSeats),
        })),
      };

      if (selectedTrain) {
        await axios.put(`/api/trains/${selectedTrain._id}`, trainData);
        toast.success("Train updated successfully");
      } else {
        await axios.post("/api/trains", trainData);
        toast.success("Train added successfully");
      }

      setShowModal(false);
      setSelectedTrain(null);
      resetForm();
      fetchTrains();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save train");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (train) => {
    setSelectedTrain(train);
    setFormData({
      ...train,
      departureTime: moment(train.departureTime).format("YYYY-MM-DDTHH:mm"),
      arrivalTime: moment(train.arrivalTime).format("YYYY-MM-DDTHH:mm"),
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this train?")) return;
    try {
      setLoading(true);
      await axios.delete(`/api/trains/${id}`);
      toast.success("Train deleted successfully");
      fetchTrains();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting train");
    } finally {
      setLoading(false);
    }
  };

  const handleClassChange = (index, field, value) => {
    const updatedClasses = [...formData.classes];
    updatedClasses[index] = {
      ...updatedClasses[index],
      [field]:
        field === "fare" || field === "totalSeats" || field === "availableSeats"
          ? Number(value)
          : value,
    };

    if (field === "totalSeats") {
      updatedClasses[index].availableSeats = Number(value);
    }

    setFormData({ ...formData, classes: updatedClasses });
  };

  const handleAddClass = () => {
    if (formData.classes.length < 6) {
      setFormData({
        ...formData,
        classes: [
          ...formData.classes,
          {
            name: "2A",
            fare: "",
            totalSeats: "",
            availableSeats: "",
          },
        ],
      });
    }
  };

  const handleRemoveClass = (index) => {
    if (formData.classes.length <= 1) {
      toast.error("At least one class is required");
      return;
    }
    const newClasses = formData.classes.filter((_, i) => i !== index);
    setFormData({ ...formData, classes: newClasses });
  };

  const handleDayToggle = (day) => {
    const newDays = formData.daysOfWeek.includes(day)
      ? formData.daysOfWeek.filter((d) => d !== day)
      : [...formData.daysOfWeek, day];
    setFormData({ ...formData, daysOfWeek: newDays });
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({
      trainNumber: "",
      trainName: "",
      source: "",
      destination: "",
      departureTime: "",
      arrivalTime: "",
      duration: "",
      totalSeats: "",
      classes: [
        {
          name: "1A",
          fare: "",
          totalSeats: "",
          availableSeats: "",
        },
      ],
      daysOfWeek: [],
      status: "Active",
    });
  };

  if (loading && !showModal) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">
          Manage Trains
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <FiPlus /> Add Train
        </button>
      </div>

      <TrainList trains={trains} onEdit={handleEdit} onDelete={handleDelete} />

      {showModal && (
        <TrainForm
          formData={formData}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onClose={() => setShowModal(false)}
          loading={loading}
          selectedTrain={selectedTrain}
          onClassChange={handleClassChange}
          onAddClass={handleAddClass}
          onRemoveClass={handleRemoveClass}
          onDayToggle={handleDayToggle}
        />
      )}
    </div>
  );
};

export default Trains;
