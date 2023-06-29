import React, { createContext, useEffect, useState } from "react";

import { ToastC } from "../components";

export const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [state, setState] = useState({
    message: "",
    severity: "info",
    open: false,
  });

  const handleState = (severity, message) => {
    setState({
      severity: severity,
      message: message,
      open: true,
    });
  };

  useEffect(() => {}, [state]);

  const success = (message) => {
    handleState("success", message);
  };

  const warning = (message) => {
    handleState("warning", message);
  };

  const info = (message) => {
    handleState("info", message);
  };

  const error = (message) => {
    handleState("error", message);
  };

  const value = { success, warning, info, error };

  return (
    <ToastContext.Provider value={value}>
      <ToastC {...state} setState={setState} />
      {children}
    </ToastContext.Provider>
  );
};
