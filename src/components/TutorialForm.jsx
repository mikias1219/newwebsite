import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TutorialForm({ onSubmit, initialData, clearEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tutorial_type: 'Maintenance',
    price: 9.99,
    posted_date: new Date().toISOString().split('T')[0],
    video_url: '',
    video_file: null,
  });
  const [videoType, setVideoType] = useState('url'); // 'url' or 'file'
  const [error, setError] = useState('');

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
    const file = e.target.files[0];
    if (file && file.type !== 'video/mp4') {
      setError('Please upload an MP4 video file.');
      return;
    }
    setError('');
    setFormData({ ...formData, video_file: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (videoType === 'file' && !formData.video_file) {
      setError('Please upload a video file.');
      return;
    }
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
      await onSubmit(submitData);
      if (!initialData) {
        setFormData({
          title: '',
          content: '',
          tutorial_type: 'Maintenance',
          price: 9.99,
          posted_date: new Date().toISOString().split('T')[0],
          video_url: '',
          video_file: null,
        });
        setVideoType('url');
      }
      setError('');
    } catch (error) {
      setError('Error uploading video or submitting form. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-800 rounded-lg shadow-lg">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-300">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="mt-1 block w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          rows="5"
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Tutorial Type</label>
        <select
          value={formData.tutorial_type}
          onChange={(e) => setFormData({ ...formData, tutorial_type: e.target.value })}
          className="mt-1 block w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Maintenance">Maintenance</option>
          <option value="Software">Software</option>
          <option value="Gaming">Gaming</option>
          <option value="DIY">DIY</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Price ($)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="mt-1 block w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Video Source</label>
        <select
          value={videoType}
          onChange={(e) => setVideoType(e.target.value)}
          className="mt-1 block w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="url">YouTube URL</option>
          <option value="file">Upload Video File</option>
        </select>
      </div>
      {videoType === 'url' ? (
        <div>
          <label className="block text-sm font-medium text-gray-300">YouTube Video URL</label>
          <input
            type="url"
            value={formData.video_url}
            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
            className="mt-1 block w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-300">Upload Video File (MP4)</label>
          <input
            type="file"
            accept="video/mp4"
            onChange={handleFileChange}
            className="mt-1 block w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>
      )}
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          {initialData ? 'Update' : 'Create'} Tutorial
        </button>
        {initialData && (
          <button
            type="button"
            onClick={clearEdit}
            className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TutorialForm;