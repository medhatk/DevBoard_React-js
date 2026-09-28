import { useEffect } from "react";
import { X } from "lucide-react";

function FormModal({ title, onClose, children }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="form-modal-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="form-modal" role="dialog" aria-modal="true" aria-labelledby="form-modal-title">
        <header className="form-modal-header">
          <h2 id="form-modal-title">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close dialog"><X /></button>
        </header>
        <div className="form-modal-content">{children}</div>
      </section>
    </div>
  );
}

export default FormModal;
