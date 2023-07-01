import styles from "./BaseText.module.scss";
import concatClasses from "src/utils/concatClasses";

interface BaseTextProps {
  className?: string;
  color?: string;
  weight?: string;
  fontSize?: string;
  style?: Object;
  As?: () => any;
}

export const BaseText: React.FC<BaseTextProps> = ({
  className,
  color,
  weight,
  fontSize,
  style,
  As = (props: any) => <p {...props} />,
  ...props
}) => {
  const { baseTextClass } = styles;

  return (
    <As
      {...props}
      className={concatClasses(baseTextClass, className || "")}
      style={{
        ...{ color, fontWeight: weight, fontSize, ...style },
      }}
    />
  );
};
