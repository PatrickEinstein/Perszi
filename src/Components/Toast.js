import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = (notification) => {
  useEffect(() => {
    if (notification) {
      toast(notification);
    }
  }, []);

  return <ToastContainer />;
};

export default ToastNotification;
