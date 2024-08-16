export function Button({ label, onClick }) {
  return (
    <div className="flex m-2">
      <button
        onClick={onClick}
        type="button"
        class="w-full py-2.5 text-sm font-medium text-gray-100 focus:outline-none bg-blue-500 rounded-lg border border-blue-700 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-300 "
      >
        {label}
      </button>
    </div>
  );
}
