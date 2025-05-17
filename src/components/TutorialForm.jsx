import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../context/ToastContext';

const TutorialForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tutorial_type: 'Maintenance',
    price: 9.99,
    video_url: '',
    video_file: null
  });
  const [videoType, setVideoType] = useState('url');
  const { toast } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        video_file: null
      });
      setVideoType(initialData.video_url ? 'url' : 'file');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      toast.success(`Tutorial ${initialData ? 'updated' : 'created'} successfully!`);
      if (!initialData) {
        setFormData({
          title: '',
          content: '',
          tutorial_type: 'Maintenance',
          price: 9.99,
          video_url: '',
          video_file: null
        });
        setVideoType('url');
      }
    } catch (error) {
      toast.error(error.message || 'Submission failed');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tutorial Type
            </label>
            <select
              value={formData.tutorial_type}
              onChange={(e) => setFormData({ ...formData, tutorial_type: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              {['Maintenance', 'Software', 'Gaming', 'DIY', 'Other'].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Source
            </label>
            <select
              value={videoType}
              onChange={(e) => setVideoType(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="url">YouTube URL</option>
              <option value="file">Upload Video</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 h-32"
          required
        />
      </div>

      {videoType === 'url' ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YouTube URL
          </label>
          <input
            type="url"
            value={formData.video_url}
            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Video (MP4)
          </label>
          <input
            type="file"
            accept="video/mp4"
            onChange={(e) => setFormData({ ...formData, video_file: e.target.files[0] })}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>
      )}

      <div className="flex gap-4 justify-end">
        {initialData && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          {initialData ? 'Update Tutorial' : 'Create Tutorial'}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default TutorialForm;