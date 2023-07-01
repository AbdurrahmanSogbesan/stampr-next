import { Modal as BootstrapModal } from "react-bootstrap";
import styles from "./Modal.module.scss";
import concatClasses from "src/utils/concatClasses";

interface ModalProps {
  scrollable?: boolean;
  show?: boolean;
  fullscreen?: boolean;
  customClass?: string;
  handleHide?: () => void;
  size: "sm" | "lg" | "xl" | undefined;
  title?: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  scrollable = true,
  show = false,
  handleHide,
  fullscreen,
  customClass = "",
  size = "sm",
  title = "",
  children,
}) => {
  const {
    fullScreenModal,
    fullScreenModal__content,
    modalHeader,
    modalHeader__title,
  } = styles;

  return (
    <div className={styles.modalContainer}>
      <BootstrapModal
        show={show}
        animation={true}
        backdrop={true}
        onHide={handleHide}
        aria-labelledby="custom-modal"
        dialogClassName={concatClasses(
          fullscreen ? fullScreenModal : "",
          customClass
        )}
        centered={true}
        contentClassName={fullscreen ? fullScreenModal__content : ""}
        scrollable={scrollable}
        size={size}
      >
        <BootstrapModal.Header className={modalHeader} closeButton>
          <div className="d-flex justify-content-center w-100 flex-column flex-md-row">
            <BootstrapModal.Title className={modalHeader__title}>
              {title}
            </BootstrapModal.Title>
            {/* {props.headerActions} */}
          </div>
        </BootstrapModal.Header>
        <BootstrapModal.Body>{children}</BootstrapModal.Body>
      </BootstrapModal>
    </div>
  );
};
