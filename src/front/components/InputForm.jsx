export default function FloatingInput({ id, label, type = "text", onChange, value, disabled, required }) {
  return (
    <div className="flex flex-col gap-1 group">
      <label
        htmlFor={id}
        className="text-xs font-medium text-neutral-600
                   group-focus-within:text-indigo-600 transition-colors"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className="w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50
                   border border-neutral-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
