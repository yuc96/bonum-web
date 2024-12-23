import React from "react";
import Swal from "sweetalert2";

interface ModalConfirmacionProps {
  open: boolean;
  mensaje: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalConfirmacion: React.FC<ModalConfirmacionProps> = ({
  open,
  mensaje,
  onClose,
  onConfirm,
}) => {
  // Mostrar el SweetAlert solo cuando el modal está abierto
  React.useEffect(() => {
    if (open) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'custom-confirm-button', // Usamos clases pero con estilo en línea
          cancelButton: 'custom-cancel-button',   // Usamos clases pero con estilo en línea
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: '¿Estás seguro?',
          text: mensaje,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar',
          reverseButtons: true,
          padding: '2em',
          // Estilos directamente en las opciones
          customClass: {
            confirmButton: 'custom-confirm-button',
            cancelButton: 'custom-cancel-button',
          },
          // Modificando la apariencia de los botones directamente en el sweetalert2
          didOpen: () => {
            // Aplicando estilos en el confirmButton y cancelButton
            const confirmButton = document.querySelector('.swal2-confirm');
            const cancelButton = document.querySelector('.swal2-cancel');

            if (confirmButton && cancelButton) {
              confirmButton.setAttribute(
                'style',
                 'background-color: #4CAF50; color: white; border: none; border-radius: 10px; padding: 12px 24px; font-size: 16px; transition: background-color 0.3s ease; margin: 20px;'

              );
              cancelButton.setAttribute(
                'style',
                'background-color: #f44336; color: white; border: none; border-radius: 10px; padding: 12px 24px; font-size: 16px; transition: background-color 0.3s ease;'

              );
            }
          },
        })
        .then((result) => {
          if (result.value) {
            onConfirm(); // Ejecutar la acción de confirmación
            swalWithBootstrapButtons.fire('Eliminado!', 'Tu colaborador se ha eliminado con éxito', 'success');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            onClose(); // Ejecutar el cierre del modal si se cancela
            swalWithBootstrapButtons.fire('Cancelado', 'Tu colaborador no ha sido eliminado', 'error');
          }
        });
    }
  }, [open, mensaje, onClose, onConfirm]);

  return null; // El SweetAlert2 se maneja a través del hook, no necesitamos renderizar nada
};

export default ModalConfirmacion;
