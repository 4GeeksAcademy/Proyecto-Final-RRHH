/* Input reutilizable con label flotante */
export default function FloatingInput({ id, label, type }) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        required
        placeholder=" "
        className="peer w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50
                   border border-neutral-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-3 text-sm text-neutral-400 transition-all
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-600
                   bg-white px-1"
      >
        {label}
      </label>
    </div>
  );
}