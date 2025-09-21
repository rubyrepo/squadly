import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import marker assets
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Custom icon setup
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Location = () => {
  const position = [23.877213340443802, 90.38709255801156];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Visit <span className="text-red-600">Squadly</span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Find us in the heart of Uttara, Dhaka. Drop by to explore our courts
            and sports activities.
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Address */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">📍 Address</h3>
              <address className="not-italic text-gray-600 leading-relaxed">
                <p className="font-medium text-lg">Squadly Sports Club</p>
                <p>House 55, Road 14</p>
                <p>Sector 11, Uttara</p>
                <p>Dhaka, Bangladesh</p>
              </address>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">📞 Contact</h3>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> +880 1234-567890
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> info@squadly.com
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">⏰ Hours</h3>
              <p className="text-gray-600">Mon – Fri: 6:00 AM – 10:00 PM</p>
              <p className="text-gray-600">Sat – Sun: 7:00 AM – 9:00 PM</p>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={position} icon={customIcon}>
                <Popup>📍 Squadly Sports Club</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;

