import React, { useEffect, useRef } from "react";

const ToastC = ({ severity, message, open, setState }) => {
  const counter = useRef(0);

  useEffect(() => {
    if (counter.current < 10) {
      counter.current += 1;
      const timer = setTimeout(
        () => setState({ severity, message, open: false }),
        1000
      );

      return () => clearTimeout(timer);
    }
  }, [open]);
  if (open)
    return (
      <div className={`toast toast-top toast-end`}>
        <div className={`alert alert-${severity}`}>
          <span>{message}</span>
        </div>
      </div>
    );
};

export default ToastC;
