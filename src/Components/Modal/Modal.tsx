/* eslint-disable multiline-ternary */
import React from "react";
import { createPortal } from "react-dom";

interface IProps {
  visibleModal: boolean;
  toggleModal: () => void;
  portalContainerRef: React.RefObject<HTMLDivElement>;
}
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
                  Rotate your device to landscape mode, then take a screenshot.
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
