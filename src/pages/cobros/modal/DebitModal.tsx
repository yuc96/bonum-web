import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

interface DebitModalProps {
  totalDebitar: number;  // Cantidad total a debitar
  show: boolean;         // Estado para mostrar u ocultar el modal
  onClose: () => void;   // Función para cerrar el modal
  onActionCancel: () => void; // Función para manejar la cancelación
  onActionConfirm: () => void; // Función para manejar la confirmación
}

const DebitModal: React.FC<DebitModalProps> = ({
  totalDebitar,
  show,
  onClose,
  onActionCancel,
  onActionConfirm,
}) => {
  useEffect(() => {
    if (show) {
      // Primer modal: Confirmación de la acción
      Swal.fire({
        icon: 'question',
        title: '¿Estás seguro que deseas debitar?',
        html: `Total a debitar: <strong>$${totalDebitar.toFixed(2)}</strong>`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#28a745', // Color del botón de confirmación
        cancelButtonColor: '#dc3545',  // Color del botón de cancelación
      }).then((result) => {
        if (result.isConfirmed) {
          // Ejecuta la acción de confirmación y muestra el modal de éxito
          onActionConfirm(); // Llama a la función que maneja la confirmación
          Swal.fire({
            icon: 'success',
            title: '¡Se ha debitado a todos!',
            html: `
              <div style="font-size: 2rem; font-weight: bold; margin-top: 1rem;">
                Total a debitar:
              </div>
              <div style="font-size: 3rem; font-weight: bold; color: #28a745; margin-top: 0.5rem;">
                $${totalDebitar.toFixed(2)}
              </div>
            `,
            padding: '2em',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
          }).then(() => {
            onClose(); // Llama a la función de cierre después de aceptar
          });
        } else {
          // Si cancela la acción, cambia el estado y cierra el modal
          onActionCancel(); // Llama a la función que maneja la cancelación
          onClose(); // Cierra el modal
        }
      });
    }
  }, [show, totalDebitar, onClose, onActionCancel, onActionConfirm]);

  return null; // Este componente no renderiza nada en el DOM, solo muestra el modal
};

export default DebitModal;
