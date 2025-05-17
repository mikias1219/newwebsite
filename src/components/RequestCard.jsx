import { motion } from 'framer-motion';

export default function RequestCard({ request }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{request.title}</h3>
          <p className="text-gray-600 mt-2 line-clamp-3">{request.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          request.status === 'Completed' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {request.status}
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Created: {new Date(request.created_at).toLocaleDateString()}
      </p>
    </motion.div>
  );
}