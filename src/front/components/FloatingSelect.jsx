export default function FloatingSelect({ id, label, children, onChange, value }) {
  return (
    <div className="relative">
      <select
        id={id}
        required
        onChange={onChange}
        value={value}
        className="peer w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50
                   border border-neutral-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {children}
      </select>
      <label
        htmlFor={id}
        className="absolute left-4 -top-2 text-xs text-indigo-600 bg-white px-1"
      >
        {label}
      </label>
    </div>
  );
}