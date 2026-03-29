export default function Loader({ label = "Loading...", compact = false, inverse = false }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${compact ? "py-0" : "py-10"}`}>
      <div className="fish-loader" aria-hidden="true">
        <span className="fish-main">🐟</span>
        <span className="fish-bubble bubble-1">•</span>
        <span className="fish-bubble bubble-2">•</span>
      </div>
      <span className={`text-sm font-medium ${inverse ? "text-white" : "text-teal-700"}`}>{label}</span>
    </div>
  );
}
