import { motion } from 'framer-motion';

export default function PurchaseCard({ purchase }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-800">{purchase.item_type}</h3>
      <p className="text-gray-600 mt-2">Quantity: {purchase.quantity}</p>
      <p className="text-blue-600 font-medium mt-2">${purchase.total_price}</p>
      <p className="text-sm text-gray-500 mt-4">
        {new Date(purchase.purchase_date).toLocaleDateString()}
      </p>
    </motion.div>
  );
}