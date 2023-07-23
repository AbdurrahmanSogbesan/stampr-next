import { FormikTouched } from "formik";
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
  error?: string;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
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
  error,
  touched,
  onBlur,
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
        className={`${styles.Input} form-control ${
          error && touched ? "mb-1" : "mb-4"
        }`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        onBlur={onBlur}
        style={
          error && touched ? { borderColor: "red" } : { borderColor: "#eee" }
        }
      />
      {error && touched && <small className={styles.Error}>{error}</small>}
    </div>
  );
};
