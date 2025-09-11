import "./button.css";

interface ButtonProps {
  label?: string;
  handleClick?: () => void;
}

const Button = ({ label, handleClick }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="button border border-white rounded-xs w-max h-12 px-8 duration-200 shrink-0"
    >
      <span className="text-white uppercase font-bold text-base">
        {label ? label : "Button label"}
      </span>
    </button>
  );
};

export default Button;
