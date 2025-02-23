import { useEffect, useState } from "react";

const TOAST_TIMEOUT = 5000;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const timeouts = [];

    toasts.forEach((toast) => {
      if (!toast.timeout) {
        const timeout = setTimeout(() => {
          setToasts((prevToasts) =>
            prevToasts.filter((t) => t.id !== toast.id)
          );
        }, TOAST_TIMEOUT);

        timeouts.push(timeout);
        toast.timeout = timeout;
      }
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [toasts]);

  function toast(message, variant = "default") {
    const id = Math.random().toString(36).slice(2);
    setToasts((prevToasts) => [...prevToasts, { id, message, variant }]);
  }

  function dismiss(id) {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }

  return {
    toasts,
    toast,
    dismiss,
  };
} 