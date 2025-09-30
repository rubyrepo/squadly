import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/userService";
import BookingModal from "../components/BookingModal";
import Swal from "sweetalert2";
import { CalendarX } from "lucide-react";

const Courts = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const data = await userService.getCourts();
      setCourts(data);
    } catch (error) {
      console.error("Error fetching courts:", error);
      Swal.fire("Error", "Failed to load courts", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (court) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSelectedCourt(court);
    setShowModal(true);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      await userService.createBooking(bookingData);
      setShowModal(false);
      Swal.fire({
        icon: "success",
        title: "Booking Submitted!",
        text: "Your booking is pending admin approval.",
      });
    } catch (error) {
      console.error("Booking error:", error);
      Swal.fire("Error", "Failed to submit booking", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Available <span className="text-red-600">Courts</span>
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Browse our courts and book your preferred session to enjoy a seamless sports experience.
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded"></div>
        </div>

        {/* Courts Grid */}
        {courts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courts.map((court) => (
              <div
                key={court._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={court.imageUrl}
                    alt={court.type}
                    className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {court.type}
                  </h2>

                  {/* Price + Book Button */}
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">
                      ${court.pricePerSession}/session
                    </p>
                    <button
                      onClick={() => handleBookClick(court)}
                      className="inline-flex items-center px-5 py-2 text-sm font-medium rounded-lg shadow-sm transition-colors bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 text-gray-600">
            <CalendarX className="w-12 h-12 mb-3 text-gray-500" />
            <p>No courts available at the moment.</p>
          </div>
        )}

        {/* Booking Modal */}
        {showModal && (
          <BookingModal
            court={selectedCourt}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleBookingSubmit}
          />
        )}
      </div>
    </section>
  );
};

export default Courts;
