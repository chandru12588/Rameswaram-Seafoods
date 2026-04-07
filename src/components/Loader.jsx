export default function Loader({ label = "Loading...", compact = false, inverse = false }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${compact ? "py-0" : "py-10"}`}>
      <div className="fish-loader fish-loader-round" aria-hidden="true">
        <span className="fish-ring" />
        <span className="fish-main fish-main-round">🐟</span>
        <span className="fish-smile">☺</span>
        <span className="fish-bubble bubble-1">•</span>
        <span className="fish-bubble bubble-2">•</span>
      </div>
      <span className={`text-sm font-semibold ${inverse ? "text-white" : "text-rose-700"}`}>{label}</span>
    </div>
  );
}
