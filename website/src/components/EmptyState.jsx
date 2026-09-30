export default function EmptyState({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-brown-100 shadow-sm">
      {icon && (
        <div className="w-16 h-16 bg-brown-50 text-brown-400 rounded-full flex items-center justify-center mb-6">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-brown-900 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-brown-500 max-w-md">
          {description}
        </p>
      )}
    </div>
  );
}
