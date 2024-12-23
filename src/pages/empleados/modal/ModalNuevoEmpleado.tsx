import React, { useEffect } from "react";
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
  // Cerrar el modal automáticamente después de 1 segundo si no hay errores
  useEffect(() => {
    if (mensaje && !errores) {
      const timer = setTimeout(() => {
        onClose(); // Cierra el modal después de 1 segundo
      }, 1000);
      return () => clearTimeout(timer); // Limpiar el timeout al desmontar el componente
    }
  }, [mensaje, errores, onClose]);

  // Determinar si la creación fue exitosa
  const isSuccess = mensaje && !errores;

  // Función para mostrar el mensaje con SweetAlert
  const showAlert = async () => {
    if (isSuccess) {
      await Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: mensaje,
        timer: 1500, // El modal se cierra automáticamente después de 1.5 segundos
        showConfirmButton: false,
      });
    } else {
      await Swal.fire({
        icon: "error",
        title: "Errores en la creación",
        html: errores?.map((error) => `<p>${error}</p>`).join(""),
        footer: '<a href="javascript:;">¿Por qué ocurrió este problema?</a>',
        padding: "2em",
      });
    }
  };

  // Ejecutar showAlert si el modal se abre
  useEffect(() => {
    if (open) {
      showAlert();
    }
  }, [open, isSuccess, errores, mensaje]);

  return null; // No necesitamos renderizar nada con el modal, SweetAlert se encarga
};

export default ModalNuevoEmpleado;
