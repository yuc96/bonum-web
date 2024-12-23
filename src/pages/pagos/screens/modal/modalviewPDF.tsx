import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { PDFDocument } from 'pdf-lib';
import Modal from 'react-modal';

import '@react-pdf-viewer/core/lib/styles/index.css';

Modal.setAppElement('#root');

interface PDFViewerModalProps {
  pagosPendientes: {
    idAnticipo: string;
    nombre: string;
    identificacion: string;
    totalDebitar: number;
  }[];
}

const PDFViewerModal: React.FC<PDFViewerModalProps> = ({ pagosPendientes }) => {
  const [editablePagos, setEditablePagos] = useState([...pagosPendientes]);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleInputChange = (index: number, field: string, value: string | number) => {
    const updatedPagos = [...editablePagos];
    updatedPagos[index] = { ...updatedPagos[index], [field]: value };
    setEditablePagos(updatedPagos);
  };

  const generateEditablePdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    page.drawText('Pagos Pendientes:', { x: 50, y: 350, size: 14 });

    editablePagos.forEach((pago, index) => {
      page.drawText(
        `${index + 1}. ${pago.nombre} - ${pago.identificacion} - $${pago.totalDebitar.toFixed(2)}`,
        { x: 50, y: 320 - index * 20, size: 12 }
      );
    });

    const pdfBytes = await pdfDoc.save();
    setPdfBytes(pdfBytes);
  };

  const downloadPdf = () => {
    if (pdfBytes) {
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'pagos_pendientes.pdf';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <button
        onClick={async () => {
          openModal();
          await generateEditablePdf();
        }}
      >
        Ver y Editar PDF
      </button>

      <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Editor de PDF">
        <div style={{ padding: '20px' }}>
          <button onClick={closeModal} style={{ marginBottom: '10px' }}>
            Cerrar
          </button>
          <h2>Editor en Tiempo Real de PDF</h2>

          {/* Formulario para editar los datos */}
          <div>
            {editablePagos.map((pago, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  value={pago.nombre}
                  onChange={(e) => handleInputChange(index, 'nombre', e.target.value)}
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  value={pago.identificacion}
                  onChange={(e) => handleInputChange(index, 'identificacion', e.target.value)}
                  placeholder="Identificación"
                />
                <input
                  type="number"
                  value={pago.totalDebitar}
                  onChange={(e) => handleInputChange(index, 'totalDebitar', Number(e.target.value))}
                  placeholder="Total a Debitar"
                />
              </div>
            ))}
            <button onClick={generateEditablePdf}>Actualizar PDF</button>
          </div>

          {/* Visor del PDF editable */}
          {pdfBytes && (
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js`}>
              <Viewer
                fileUrl={URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }))}
              />
            </Worker>
          )}

          <button onClick={downloadPdf} style={{ marginTop: '10px' }}>
            Descargar PDF
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PDFViewerModal;
