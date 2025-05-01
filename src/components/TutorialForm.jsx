import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TutorialForm({ onSubmit, initialData, clearEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Cleaning',
    price: 9.99,
    posted_date: new Date().toISOString().split('T')[0],
    video_url: '',
    video_file: null,
  });
  const [videoType, setVideoType] = useState('url'); // 'url' or 'file'

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        video_file: null, // File inputs can't be pre-filled
      });
      setVideoType(initialData.video_url ? 'url' : initialData.video_file ? 'file' : 'url');
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    setFormData({ ...formData, video_file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let video_file_path = null;
      if (videoType === 'file' && formData.video_file) {
        const fileFormData = new FormData();
        fileFormData.append('file', formData.video_file);
        const response = await axios.post('http://localhost:8000/upload-video/', fileFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        video_file_path = response.data.path;
      }
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        video_url: videoType === 'url' ? formData.video_url : null,
        video_file: videoType === 'file' ? video_file_path : null,
      };
      onSubmit(submitData);
      if (!initialData) {
        setFormData({
          title: '',
          content: '',
          category: 'Cleaning',
          price: 9.99,
          posted_date: new Date().toISOString().split('T')[0],
          video_url: '',
          video_file: null,
        });
        setVideoType('url');
      }
    } catch (error) {
      console.error('Error uploading video or submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
          rows="4"
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
        >
          <option value="Cleaning">Cleaning</option>
          <option value="Repair">Repair</option>
          <option value="Upgrades">Upgrades</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Price</label>
        <input
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Video Type</label>
        <select
          value={videoType}
          onChange={(e) => setVideoType(e.target.value)}
          className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
        >
          <option value="url">YouTube URL</option>
          <option value="file">Upload Video File</option>
        </select>
      </div>
      {videoType === 'url' ? (
        <div>
          <label className="block text-sm font-medium text-gray-300">YouTube Video URL</label>
          <input
            type="text"
            value={formData.video_url}
            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
            className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-300">Upload Video File</label>
          <input
            type="file"
            accept="video/mp4"
            onChange={handleFileChange}
            className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
          />
        </div>
      )}
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {initialData ? 'Update' : 'Create'} Tutorial
        </button>
        {initialData && (
          <button
            type="button"
            onClick={clearEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TutorialForm;