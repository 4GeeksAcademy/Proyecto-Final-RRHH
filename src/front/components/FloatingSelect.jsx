export default function FloatingSelect({ id, label, children, onChange }) {
  return (
    <div className="relative">
      <select
        id={id}
        required
        onChange={onChange}
        className="peer w-full px-4 py-3 text-sm text-neutral-800 dark:text-white bg-neutral-50 dark:bg-gray-800
                   border border-neutral-300 dark:border-gray-700 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
      >
        {children}
      </select>
      <label
        htmlFor={id}
        className="absolute left-4 -top-2 text-xs text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-900 px-1"
      >
        {label}
      </label>
    </div>
  );
}