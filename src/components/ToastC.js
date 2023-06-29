import React, { useEffect, useRef } from "react";

const ToastC = ({ severity, message, open, setState }) => {
  const counter = useRef(0);

  useEffect(() => {
    if (counter.current < 10) {
      counter.current += 1;
      const timer = setTimeout(
        () => setState({ severity, message, open: false }),
        2000
      );

      return () => clearTimeout(timer);
    }
  }, [open]);
  if (open)
    return (
      <div className={`toast toast-top toast-center z-10`}>
        <div className={`alert alert-${severity}`}>
          <span className="text-white">{message}</span>
        </div>
      </div>
    );
};

export default ToastC;
