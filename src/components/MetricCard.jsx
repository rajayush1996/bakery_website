export default function MetricCard({ title, value, icon, color = "primary", subtitle }) {
  const colorMap = {
    primary: "bg-pink-50 text-primary border-pink-200",
    secondary: "bg-amber-50 text-secondary border-amber-200",
    green: "bg-green-50 text-green-600 border-green-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
  };

  return (
    <div className={`bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-dark-brown">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
