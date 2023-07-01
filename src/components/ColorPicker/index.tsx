import { Form } from "react-bootstrap";

interface ColorPickerProps {
  label?: string;
  id?: string;
  value?: string;
  onChange?: (e: any) => void;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label = "Choose Color",
  id = "colorInput",
  value = "#000",
  className = "",
  onChange = () => ({}),
}) => {
  return (
    <div className={className}>
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <Form.Control
        type="color"
        id={id}
        defaultValue={value}
        title="Choose your color"
        onChange={(event) => onChange(event)}
      />
    </div>
  );
};
