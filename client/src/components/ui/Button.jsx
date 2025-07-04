const Button = ({
  children,
  type = "button",
  className = "",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg  bg-black hover:bg-[#00000069] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
