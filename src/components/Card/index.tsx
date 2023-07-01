import styles from "./Card.module.scss";

interface CardProps {
  bgColor?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className={`${styles.Card} ${props.className}`}
      style={{ backgroundColor: props.bgColor }}
    >
      {props.children}
    </div>
  );
};
