import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 3200) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container" role="region" aria-label="Notifications">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast" role="alert">
            {toast.type === "success" && <CheckCircle2 size={16} color="var(--success)" />}
            {toast.type === "error" && <AlertCircle size={16} color="var(--danger)" />}
            {toast.type === "info" && <Info size={16} color="var(--accent)" />}
            <span style={{ flex: 1, fontSize: "0.875rem" }}>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ opacity: 0.6, display: "flex", alignItems: "center" }}
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return { addToast: (msg) => console.log(msg) };
  }
  return context;
}
