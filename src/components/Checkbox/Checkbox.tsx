import "./checkbox.css";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
}

const Checkbox = ({ checked, ...otherProps }: CheckboxProps) => {
  return <input type="checkbox" checked={checked} {...otherProps} />;
};

export default Checkbox;
