import styles from "./Icon.module.scss";
import { Icons } from "./icons";

type IconTypes = keyof typeof Icons;

interface IconProps {
  icon: IconTypes;
  height?: number;
  width?: number;
  fill?: string;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  height,
  width,
  fill,
  onClick,
}) => {
  const IconComponent = Icons[icon];
  return (
    <div className={styles.IconContainer} onClick={onClick}>
      <IconComponent
        height={height || 10}
        width={width || 10}
        fill={fill || "grey"}
      />
    </div>
  );
};

export default Icon;
