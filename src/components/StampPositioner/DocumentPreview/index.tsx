import React, { Ref, forwardRef } from "react";
// import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import styles from "./DocumentPreview.module.scss";
import { DragItemTypes } from "src/utils/constants";

interface DocumentPreviewProps {
  document?: string;
  handleDrop: (position: { x: number; y: number }) => void;
}

export const DocumentPreview = forwardRef(
  ({ document, handleDrop }: DocumentPreviewProps, ref: any) => {
    const { wrapper } = styles;
    const [{ isOver, canDrop }, drop] = useDrop(
      () => ({
        accept: DragItemTypes.STAMP,
        drop: (item, monitor) => {
          const offset = monitor.getSourceClientOffset();
          if (offset) {
            // todo: idk man
            const dropTargetXy = ref?.current.getBoundingClientRect();
            handleDrop({
              x: offset.x - dropTargetXy.left,
              y: offset.y - dropTargetXy.top,
            });
          }
        },
        canDrop: () => true,
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
        }),
      }),
      []
    );
    return (
      <div ref={ref}>
        <img
          src={document}
          className={wrapper}
          ref={drop}
          style={{
            border: isOver ? "1px dashed red" : "none",
          }}
        />
      </div>
    );
  }
);
