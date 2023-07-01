import React, { useRef, useState } from "react";
import styles from "./StampPositioner.module.scss";
import { Button, ColorPicker, Input, Modal } from "..";
import { StampPreview } from "./StampPreview";
import { DocumentPreview } from "./DocumentPreview";

interface StampPositionerProps {
  stamp?: string;
  doc?: string;
  show?: boolean;
  handleHide: () => void;
  handleSubmit: (arg: any) => void;
}

export const StampPositioner: React.FC<StampPositionerProps> = ({
  stamp,
  doc,
  show,
  handleHide,
  handleSubmit,
}) => {
  const { base, base__wrapper } = styles;

  const [stampPosition, setStampPosition] = useState({ x: 10, y: 10 });
  const [submitting, setSubmitting] = useState(false);
  const [color, setColor] = useState("#000");
  const [customText, setCustomText] = useState("");
  const [width, setWidth] = useState(120); // todo: use default image width/height or default 120
  const [height, setHeight] = useState(120);
  const docRef = useRef(null);

  const submit = async () => {
    try {
      setSubmitting(true);
      await handleSubmit({
        stampPosition,
        customText,
        width,
        height,
        color,
      });
      setSubmitting(false);
      handleHide();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      scrollable={false}
      show={show}
      handleHide={handleHide}
      fullscreen
      size="xl"
      title="Position your stamp"
    >
      <div className={base}>
        <div className="d-flex justify-content-center">
          <div className={base__wrapper}>
            <DocumentPreview
              ref={docRef}
              document={doc}
              handleDrop={(position) => setStampPosition(position)}
            />
            <StampPreview
              stamp={stamp}
              width={width}
              height={height}
              customText={customText}
              stampPosition={stampPosition}
              color={color}
            />
          </div>
          <div>
            <div className="d-flex">
              <Input
                label="Stamp Width"
                placeholder="Enter value"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
              />
              <Input
                label="Stamp Height"
                customClass="mx-2"
                placeholder="Enter value"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
              />
            </div>

            <div>
              <Input
                label="Custom Text"
                placeholder="Custom Text"
                value={customText}
                onChange={(event) => setCustomText(event.target.value)}
              />
              <ColorPicker
                // className="mt-5"
                value={color}
                onChange={(event) => setColor(event.target.value)}
              />
              <Button
                label="Let's Go"
                className="fw-little mb-5 mx-auto mt-5"
                disabled={submitting}
                handleClick={submit}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
