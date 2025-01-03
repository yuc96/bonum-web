import * as XLSX from 'xlsx-js-style';
import mongoose from 'mongoose';

// Funciones de validación mejoradas
const validateEcuadorianID = (id: string) => {
    if (!id || typeof id !== 'string') return false;
    const cleanId = id.trim();
    if (!/^[0-9]{10}$/.test(cleanId)) return false;

    // Algoritmo de validación de cédula ecuatoriana
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const provincia = parseInt(cleanId.substring(0, 2));
    if (provincia < 1 || provincia > 24) return false;

    let suma = 0;
    for (let i = 0; i < 9; i++) {
        let valor = parseInt(cleanId.charAt(i)) * coeficientes[i];
        if (valor > 9) valor -= 9;
        suma += valor;
    }

    const digitoVerificador = (10 - (suma % 10)) % 10;
    return digitoVerificador === parseInt(cleanId.charAt(9));
};

const validateEmail = (email: string) => {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email.trim());
};

const validateEcuadorPhone = (phone: string) => {
    if (!phone || typeof phone !== 'string') return false;
    const cleanPhone = phone.replace(/\D/g, '');
    return /^(?:0[2-7]|0[9])[0-9]{7,8}$/.test(cleanPhone);
};

const isValidDate = (date: any) => {
    if (!date) return false;
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
};


interface Employee {
    identification_number: string;
    name: string;
    lastname: string;
    address: string;
    date_of_birth: Date;
    level_education: string;
    email: string;
    phoneMovil: string;
    provincia: string;
    ciudad: string;
    job_title: string;
    registration_date?: Date;
    gross_salary: number;
    net_salary: number;
    other_income?: number;
    observations?: string;
    status: string;
}

// Modificar la interfaz de retorno
interface ValidationResult {
  excelBuffer: Buffer | null;
  validData: Employee[];
}

export function DataValidator(data: Employee[]): ValidationResult {
    if (!Array.isArray(data) || data.length === 0) return { excelBuffer: null, validData: [] };

    const wb = XLSX.utils.book_new();
    const ws_data: any[] = [];
    const validEmployees: Employee[] = [];

    // Definir encabezados y sus validaciones
    const validations = [
        { header: 'identification_number', validate: validateEcuadorianID },
        { header: 'name', validate: (v: string) => v?.trim()?.length > 0 },
        { header: 'lastname', validate: (v: string) => v?.trim()?.length > 0 },
        { header: 'address', validate: (v: string) => v?.trim()?.length > 0 },
        { header: 'date_of_birth', validate: (v: Date) => isValidDate(v) && new Date(v) < new Date() },
        { header: 'level_education', validate: (v: string) => ['Ninguno','Primaria', 'Secundaria', 'Técnico', 'Tecnológico', 'Universitario', 'Posgrado','Doctorado'].includes(v?.toLowerCase()) },
        { header: 'email', validate: validateEmail },
        { header: 'phoneMovil', validate: validateEcuadorPhone },
        { header: 'provincia', validate: (v: string) => /^[a-zA-ZáéíóúÁÉÍÓÚ\s]{2,50}$/.test(v) },
        { header: 'ciudad', validate: (v: string) => /^[a-zA-ZáéíóúÁÉÍÓÚ\s]{2,50}$/.test(v) },
        { header: 'job_title', validate: (v: string) => v?.trim()?.length > 0 && v.length <= 100 },
        { header: 'gross_salary', validate: (v: number) => typeof v === 'number' && v >= 0 },
        { header: 'net_salary', validate: (v: number) => typeof v === 'number' && v >= 0 },
    ];

    // Agregar encabezados
    ws_data.push(validations.map(v => v.header));

    // Validar cada fila
    let hasErrors = false;
    data.forEach((employee, rowIndex) => {
        const row: any[] = [];
        const errorRow: boolean[] = [];
        let isValidEmployee = true;

        validations.forEach(({header, validate}) => {
            const value = employee[header as keyof Employee];
            const isValid = validate(value as never);

            row.push(value ?? '');
            errorRow.push(!isValid);

            if (!isValid) {
                hasErrors = true;
                isValidEmployee = false;
            }
        });

        // Si el empleado es válido, agregarlo al array de válidos
        if (isValidEmployee) {
            validEmployees.push(employee);
        }

        // Crear fila con estilos
        const styleRow = row.map((cell, index) => ({
            v: cell,
            t: 's',
            s: {
                fill: {
                    fgColor: { rgb: errorRow[index] ? 'FFCDD2' : 'FFFFFF' }
                },
                font: {
                    color: { rgb: errorRow[index] ? 'B71C1C' : '000000' }
                }
            }
        }));

        ws_data.push(styleRow);
    });

    // Preparar el resultado
    let excelBuffer = null;
    if (hasErrors) {
        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        XLSX.utils.book_append_sheet(wb, ws, 'Validation Results');
        excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
    }

    return {
        excelBuffer,
        validData: validEmployees
    };
}

export default DataValidator;
