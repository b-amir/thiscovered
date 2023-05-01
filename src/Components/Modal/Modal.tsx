import React from "react";
// import { CoverBox } from "../CoverBox";
import { createPortal } from "react-dom";
import "./style.css";

interface IProps {
  visibleModal: boolean;
  toggleModal: () => void;
  portalContainerRef: React.RefObject<HTMLDivElement>;
}
// export const modalRef = useRef<HTMLDivElement>(null);
const Modal = ({
  visibleModal,
  toggleModal,
  portalContainerRef
}: IProps): JSX.Element | null =>
  visibleModal
    ? createPortal(
        <div className="modal">
          <div
            className="modal-pop"
            id="modal-pop"
            role="dialog"
            ref={portalContainerRef}
            aria-modal="true">
            <div className="modal-header">
              {window.innerWidth < 768 ? (
                <p className="modal-help mobile">
                  Rotate your device to landscape mode for a better screenshot.
                </p>
              ) : (
                <p className="modal-help computer">
                  Now use <code>PRT SC</code> button on your keyboard to capture
                  screenshot.
                </p>
              )}

              <button
                className="modal-close"
                type="button"
                onClick={toggleModal}>
                ✕
              </button>
            </div>
          </div>
          <div className="modal-overlay" onClick={toggleModal}></div>
        </div>,
        document.body
      )
    : null;

export default Modal;
