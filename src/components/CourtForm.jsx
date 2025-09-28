import React, { useState, useEffect } from 'react';

const CourtForm = ({ court, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '',
    timeSlots: '',
    pricePerSession: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (court) {
      setFormData({
        type: court.type || '',
        timeSlots: court.timeSlots || '',
        pricePerSession: court.pricePerSession || '',
        imageUrl: court.imageUrl || '',
      });
    }
  }, [court]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Court Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        >
          <option value="">Select type</option>
          <option value="Tennis">Tennis</option>
          <option value="Badminton">Badminton</option>
          <option value="Squash">Squash</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Time Slots</label>
        <input
          type="text"
          name="timeSlots"
          value={formData.timeSlots}
          onChange={handleChange}
          required
          placeholder="e.g., 9:00 AM - 10:00 PM"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price Per Session</label>
        <input
          type="number"
          name="pricePerSession"
          value={formData.pricePerSession}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Court Image URL</label>
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          placeholder="Enter image URL"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="Court preview"
            className="mt-2 h-32 w-auto object-cover rounded-md"
          />
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
        >
          {court ? 'Update' : 'Create'} Court
        </button>
      </div>
    </form>
  );
};

export default CourtForm;