import { useDrag } from "react-dnd";
import styles from "./StampPreview.module.scss";
import { DragItemTypes } from "src/utils/constants";

interface StampPreviewProps {
  stamp?: string;
  customText?: string;
  stampPosition: {
    x: number;
    y: number;
  };
  width?: number;
  height?: number;
  color?: string;
}

export const StampPreview: React.FC<StampPreviewProps> = ({
  stamp,
  customText,
  stampPosition,
  width,
  height,
  color,
}) => {
  const { wrapper, wrapper__text } = styles;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragItemTypes.STAMP,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.2 : 1,
        cursor: "move",
        left: stampPosition.x,
        top: stampPosition.y,
      }}
      className={wrapper}
    >
      <img src={stamp} height={height} width={width} />
      <div className={wrapper__text} style={{ color }}>
        {customText}
      </div>
    </div>
  );
};
