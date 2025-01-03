import React, { useEffect, useCallback } from "react";
import Swal from "sweetalert2";

interface ModalNuevoEmpleadoProps {
  open: boolean;
  mensaje: string | null;
  errores: string[] | null;
  onClose: () => void;
}

const ModalNuevoEmpleado: React.FC<ModalNuevoEmpleadoProps> = ({
  open,
  mensaje,
  errores,
  onClose,
}) => {
  const isSuccess = mensaje && !errores;

  const showAlert = useCallback(async () => {
    if (isSuccess) {
      await Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: mensaje,
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      await Swal.fire({
        icon: "error",
        title: "Errores en la creación",
        html: errores?.map((error) => `<p>${error}</p>`).join(""),
        padding: "2em",
      });
    }
  }, [isSuccess, mensaje, errores]);

  useEffect(() => {
    if (mensaje && !errores) {
      const timer = setTimeout(onClose, 1000);
      return () => clearTimeout(timer);
    }
  }, [mensaje, errores, onClose]);

  useEffect(() => {
    if (open) {
      showAlert();
    }
  }, [open, showAlert]);

  return null;
};

export default ModalNuevoEmpleado;
