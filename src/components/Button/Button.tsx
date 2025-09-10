// Plain button

interface ButtonProps {
  label?: string;
  handleClick?: () => void;
}

const Button = ({ label, handleClick }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="border border-white rounded-xs w-max h-max px-10 py-3"
    >
      <span className="text-white uppercase font-bold text-lg">{label}</span>
    </button>
  );
};

export default Button;
