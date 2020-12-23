import React, { FunctionComponent, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal: FunctionComponent = ({ children }) => {
  const elRef = useRef(document.createElement("div"));

  useEffect(() => {
    if (!modalRoot) return;

    const ref = modalRoot.appendChild(elRef.current);

    return () => {
      modalRoot.removeChild(ref);
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
