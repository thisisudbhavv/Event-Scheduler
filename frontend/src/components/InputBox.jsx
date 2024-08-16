export function InputBox({ label, placeholder, type, onChange }) {
  return (
    <div className="p-2">
      <div className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </div>
      <input
        onChange={onChange}
        type={type}
        className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
}
