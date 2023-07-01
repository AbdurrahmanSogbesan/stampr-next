import styles from "./Button.module.scss";

export interface ButtonProps {
  label?: string;
  className?: string;
  variant?: string;
  type?: "button" | "submit" | "reset" | undefined;
  block?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  handleClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  className = "",
  handleClick,
  variant = "primary",
  disabled = false,
  type,
  block = false,
  rounded,
  ...props
}) => {
  const componentClass = `btn btn-${variant}`;
  const blockStyle = block
    ? {
        display: "block",
        width: "100%",
      }
    : null;
  const borderStyle = {
    borderRadius: rounded ? "999px" : "10px",
  };
  return (
    <button
      style={{ ...blockStyle, ...borderStyle }}
      className={`${styles.Button} ${className} ${componentClass}`}
      disabled={disabled}
      onClick={handleClick}
      type={type}
    >
      {/* <Icon icon="play" /> */}
      {props.label || "Submit"}
    </button>
  );
};
