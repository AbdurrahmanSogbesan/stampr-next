import PropTypes from "prop-types";
import styles from "./ProgressRing.module.scss";
import React, { useEffect, useState, useRef } from "react";

interface ProgressRingProps {
  progress: number | string;
  size: number;
  strokeWidth?: number;
  circleOneStroke?: string;
  circleTwoStroke?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  size = 200,
  progress = 0,
  strokeWidth = 15,
  circleOneStroke,
  circleTwoStroke,
}) => {
  const radius = size / 2 - strokeWidth / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const circleRef = useRef(null);

  const [offset, setOffset] = useState(0);

  const isStrProgress = typeof progress === "string";

  useEffect(() => {
    if (!isStrProgress) {
      const progressOffset = ((100 - progress) / 100) * circumference;
      setOffset(progressOffset);
    }
  }, [setOffset, circumference, progress, offset]);

  return (
    <svg className={styles.svg} width={size} height={size}>
      <circle
        className={styles["svg-circle-bg"]}
        stroke={circleOneStroke || "#7ea9e1"}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        ref={circleRef}
        className={styles["svg-circle"]}
        stroke={circleTwoStroke || "#000"}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDashoffset={offset}
        strokeDasharray={circumference}
      />
      <text className={styles["svg-circle-text"]} x={center} y={center}>
        {progress}
        {isStrProgress ? "" : "%"}
      </text>
    </svg>
  );
};
