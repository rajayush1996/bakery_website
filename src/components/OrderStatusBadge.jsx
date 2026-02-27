const statusConfig = {
  Pending: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
  Preparing: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  Ready: { bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-500" },
  Delivered: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
};

export default function OrderStatusBadge({ status }) {
  const config = statusConfig[status] || { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}
