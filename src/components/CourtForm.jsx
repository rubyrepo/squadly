import React, { useState, useEffect } from 'react';
import {
  Clock,
  Trash2,
  Plus,
  Save,
  Pencil,
  X,
  DollarSign,
  Sword, // A general sports icon
  Building, // A general facility icon
} from 'lucide-react';

// Map facility types. We are no longer trying to render icons inside the <option> tag.
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

  const [newSlot, setNewSlot] = useState({
    start: '',
    end: ''
  });

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSlotChange = (e) => {
    const { name, value } = e.target;
    setNewSlot(prev => ({ ...prev, [name]: value }));
  };

  const addTimeSlot = () => {
    if (newSlot.start && newSlot.end && newSlot.start < newSlot.end) {
      const timeSlot = `${newSlot.start} - ${newSlot.end}`;
      setFormData(prev => ({
        ...prev,
        timeSlots: [...prev.timeSlots, timeSlot]
      }));
      setNewSlot({ start: '', end: '' });
    } else {
      alert('Please ensure the End Time is after the Start Time.');
    }
  };

  const removeTimeSlot = (index) => {
    setFormData(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass = "mt-1 block w-full rounded-lg border-gray-300 shadow-sm transition duration-150 ease-in-out focus:ring-red-500 focus:border-red-500 p-2 border";
  
  // Choose a sensible default icon for the header based on whether we are creating or editing
  const HeaderIcon = court ? Pencil : Building;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-2xl rounded-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 flex items-center">
        <HeaderIcon className="w-6 h-6 mr-2 text-red-500" />
        {court ? 'Edit Facility Details' : 'Create New Facility'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Facility Type (Icon removed from select) */}
        <div>
          <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-1">
            Facility Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Sword className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className={`${inputClass} pl-10`} // Added pl-10 back for the Sword icon prefix
            >
              <option value="" disabled>Select a facility type</option>
              {facilityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Per Session */}
        <div>
          <label htmlFor="pricePerSession" className="block text-sm font-semibold text-gray-700 mb-1">
            Price Per Session (in currency) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <DollarSign className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 w-5 h-5 mt-2" />
            <input
              id="pricePerSession"
              type="number"
              name="pricePerSession"
              value={formData.pricePerSession}
              onChange={handleChange}
              required
              min="0"
              placeholder="e.g., 25.00"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        
        {/* Time Slots */}
        <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
          <label className="block text-md font-semibold text-gray-700 mb-3 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-600" /> Available Time Slots
          </label>
          
          {/* Current Slots List */}
          <div className="space-y-2 mb-4">
            {formData.timeSlots.length === 0 ? (
                <p className="text-sm text-gray-500 italic p-2">No time slots added yet.</p>
            ) : (
                formData.timeSlots.map((slot, index) => (
                    <div 
                        key={index} 
                        className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md shadow-sm"
                    >
                        <span className="text-sm font-medium text-gray-800">{slot}</span>
                        <button
                            type="button"
                            onClick={() => removeTimeSlot(index)}
                            className="text-red-500 hover:text-red-700 p-1 transition duration-150 ease-in-out rounded-full hover:bg-red-50"
                            aria-label={`Remove slot ${slot}`}
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))
            )}
          </div>

          {/* Add New Slot Input */}
          <div className="flex flex-col sm:flex-row gap-3 items-center pt-3 border-t border-gray-200">
            <div className='flex gap-2 flex-1'>
                <input
                    type="time"
                    name="start"
                    value={newSlot.start}
                    onChange={handleSlotChange}
                    className={`${inputClass} flex-1`}
                    aria-label="Slot Start Time"
                />
                <span className="self-center text-gray-500 font-bold text-lg">–</span>
                <input
                    type="time"
                    name="end"
                    value={newSlot.end}
                    onChange={handleSlotChange}
                    className={`${inputClass} flex-1`}
                    aria-label="Slot End Time"
                />
            </div>
            <button
              type="button"
              onClick={addTimeSlot}
              disabled={!newSlot.start || !newSlot.end}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Slot
            </button>
          </div>
        </div>

        {/* Facility Image URL */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-1">
            Facility Image URL <span className="text-red-500">*</span>
          </label>
          <input
            id="imageUrl"
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            placeholder="e.g., https://example.com/facility.jpg"
            className={inputClass}
          />
          {formData.imageUrl && (
            <div className="mt-4 p-2 border border-gray-200 rounded-lg bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">Image Preview:</p>
              <img
                src={formData.imageUrl}
                alt="Facility preview"
                className="h-40 w-full object-cover rounded-md shadow-md"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm flex items-center"
          >
            <X className="w-4 h-4 mr-1" /> Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 transition duration-150 ease-in-out shadow-md flex items-center"
          >
            {court ? <><Save className="w-4 h-4 mr-1" /> Save Changes</> : <><Plus className="w-4 h-4 mr-1" /> Create Facility</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourtForm;