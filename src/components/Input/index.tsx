import styles from "./Input.module.scss";

interface InputProps {
  name?: string;
  type?: string;
  label?: string;
  id?: string;
  placeholder?: string;
  value?: string | number;
  onChange: (e: any) => void;
  customClass?: string;
}

export const Input: React.FC<InputProps> = ({
  name,
  type,
  label,
  value,
  onChange,
  id,
  placeholder,
  customClass,
}) => {
  return (
    <div className={customClass}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        className={`${styles.Input} form-control mb-4`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
