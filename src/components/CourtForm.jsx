import React, { useState, useEffect } from 'react';
import {
  Clock,
  Trash2,
  Plus,
  Save,
  Pencil,
  X,
  DollarSign,
  Sword,
  Building,
} from 'lucide-react';
import Swal from 'sweetalert2';

const facilityOptions = [
  { value: 'Tennis', label: 'Tennis Court' },
  { value: 'Badminton', label: 'Badminton Court' },
  { value: 'Squash', label: 'Squash Court' },
  { value: 'Basketball', label: 'Basketball Court' },
  { value: 'Volleyball', label: 'Volleyball Court' },
  { value: 'Swimming', label: 'Swimming Pool' },
  { value: 'Gym/Fitness', label: 'Gym/Fitness Area' },
  { value: 'Multi-Purpose', label: 'Multi-Purpose Hall' },
  { value: 'Ice Rink', label: 'Ice Skating Rink' },
];

const CourtForm = ({ court, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '',
    timeSlots: [],
    pricePerSession: '',
    imageUrl: '',
  });

  const [newSlot, setNewSlot] = useState({ start: '', end: '' });

  useEffect(() => {
    if (court) {
      setFormData({
        type: court.type || '',
        timeSlots: court.timeSlots || [],
        pricePerSession: court.pricePerSession || '',
        imageUrl: court.imageUrl || '',
      });
    }
  }, [court]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSlotChange = (e) => {
    const { name, value } = e.target;
    setNewSlot((prev) => ({ ...prev, [name]: value }));
  };

  const addTimeSlot = () => {
    if (newSlot.start && newSlot.end && newSlot.start < newSlot.end) {
      const timeSlot = `${newSlot.start} - ${newSlot.end}`;
      setFormData((prev) => ({ ...prev, timeSlots: [...prev.timeSlots, timeSlot] }));
      setNewSlot({ start: '', end: '' });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Time Slot',
        text: 'End time must be after start time.',
      });
    }
  };

  const removeTimeSlot = (index) => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass = 'mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 p-3 border transition';
  const HeaderIcon = court ? Pencil : Building;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3 border-b pb-4">
        <HeaderIcon className="w-7 h-7 text-red-500" />
        {court ? 'Edit Facility' : 'Add New Facility'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Facility Type */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Facility Type <span className="text-red-500">*</span></label>
          <div className="relative">
            <Sword className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className={`${inputClass} pl-10`}
            >
              <option value="" disabled>Select a facility</option>
              {facilityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Price Per Session ($) <span className="text-red-500">*</span></label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              type="number"
              name="pricePerSession"
              value={formData.pricePerSession}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="25.00"
              required
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <label className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-600" /> Available Time Slots
          </label>

          {formData.timeSlots.length === 0 && <p className="text-gray-400 italic mb-3">No slots added yet</p>}
          <div className="space-y-2 mb-4">
            {formData.timeSlots.map((slot, idx) => (
              <div key={idx} className="flex justify-between items-center bg-white border border-gray-200 rounded-md p-2 shadow-sm">
                <span className="text-gray-800 font-medium">{slot}</span>
                <button
                  type="button"
                  onClick={() => removeTimeSlot(idx)}
                  className="text-red-500 hover:text-red-700 rounded-full p-1 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center border-t border-gray-200 pt-3">
            <div className="flex gap-2 flex-1">
              <input
                type="time"
                name="start"
                value={newSlot.start}
                onChange={handleSlotChange}
                className={`${inputClass} flex-1`}
              />
              <span className="self-center font-bold text-gray-500 text-lg">–</span>
              <input
                type="time"
                name="end"
                value={newSlot.end}
                onChange={handleSlotChange}
                className={`${inputClass} flex-1`}
              />
            </div>
            <button
              type="button"
              onClick={addTimeSlot}
              disabled={!newSlot.start || !newSlot.end}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Slot
            </button>
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Facility Image <span className="text-red-500">*</span></label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            placeholder="https://example.com/image.jpg"
            className={inputClass}
          />
          {formData.imageUrl && (
            <div className="mt-4 rounded-lg overflow-hidden shadow-md">
              <img src={formData.imageUrl} alt="Preview" className="h-48 w-full object-cover" />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
          >
            {court ? <><Save className="w-4 h-4" /> Save Changes</> : <><Plus className="w-4 h-4" /> Create Facility</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourtForm;
