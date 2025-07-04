const InputField = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  label = "",
}) => {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label || placeholder}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
