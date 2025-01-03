import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from "react";
import IconSearch from "../../../components/Icon/IconSearch";
import IconXCircle from "../../../components/Icon/IconXCircle";
import Dropdown from "../../../components/Dropdown";
import IconCaretDown from "../../../components/Icon/IconCaretDown";
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconArrowLeft from '../../../components/Icon/IconArrowLeft';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { NavLink, useLocation } from 'react-router-dom';
import { WindowSharp } from '@mui/icons-material';
import Select from 'react-select';
import IconSave from '../../../components/Icon/IconSave';
import PagosPendientesTable from './PagosPendientesTable';
import IconDownload from '../../../components/Icon/IconDownload';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logoBonum from'../../../components/images/LogoBonum.png'
import PDFViewerModal from'./modal/modalviewPDF'
import * as XLSX from 'xlsx';
import { WorkSheet, WorkBook } from 'xlsx';

const pagosPendientes = [
    {
        idAnticipo: "#000001",
        nombre: "Santiago Efraín Vásquez Carreño",
        identificacion: "0917319337",
        fechaAnticipo: "15-Nov-2024",
        anticipoActivo: 300.00, // Valor monetario como float
        cuota: "2/3",
        saldo: 200.00,
        valorCuota: 100.00,
        tasaUnica: 0.00,
        totalDebitar: 100.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000002",
        nombre: "Alexander Gray",
        identificacion: "0924842339",
        fechaAnticipo: "20-Nov-2024",
        anticipoActivo: 500.00,
        cuota: "1/5",
        saldo: 500.00,
        valorCuota: 100.00,
        tasaUnica: 40.00,
        totalDebitar: 140.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000003",
        nombre: "James Taylor",
        identificacion: "0198832922",
        fechaAnticipo: "27-Nov-2024",
        anticipoActivo: 300.00,
        cuota: "2/6",
        saldo: 250.00,
        valorCuota: 50.00,
        tasaUnica: 0.00,
        totalDebitar: 50.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000004",
        nombre: "Grace Roberts",
        identificacion: "0192033910",
        fechaAnticipo: "30-Nov-2024",
        anticipoActivo: 200.00,
        cuota: "3/3",
        saldo: 66.67,
        valorCuota: 66.67,
        tasaUnica: 0.00,
        totalDebitar: 66.67,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000005",
        nombre: "Donna Rogers",
        identificacion: "0123928392",
        fechaAnticipo: "03-Sep-2024",
        anticipoActivo: 100.00,
        cuota: "4/4",
        saldo: 25.00,
        valorCuota: 25.00,
        tasaUnica: 0.00,
        totalDebitar: 25.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000006",
        nombre: "Amy Diaz",
        identificacion: "0182938910",
        fechaAnticipo: "14-Oct-2024",
        anticipoActivo: 300.00,
        cuota: "1/4",
        saldo: 300.00,
        valorCuota: 75.00,
        tasaUnica: 20.00,
        totalDebitar: 95.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000007",
        nombre: "Nia Hillyer",
        identificacion: "0118290093",
        fechaAnticipo: "20-Oct-2024",
        anticipoActivo: 100.00,
        cuota: "3/4",
        saldo: 50.00,
        valorCuota: 25.00,
        tasaUnica: 0.00,
        totalDebitar: 25.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000008",
        nombre: "Mary McDonald",
        identificacion: "0104566578",
        fechaAnticipo: "25-Nov-2024",
        anticipoActivo: 100.00,
        cuota: "2/3",
        saldo: 66.67,
        valorCuota: 33.33,
        tasaUnica: 0.00,
        totalDebitar: 33.33,
        acciones: "Ver"
    }
];

const transacciones = [
    {
        value: 'Transferencia Bancaria',
        label: 'Transferencia Bancaria'
    },
    {
        value: 'Deposito en Cuenta',
        label: 'Deposito en Cuenta'
    },
    {
        value: 'Pago en Efectivo',
        label: 'Pago en Efectivo'
    },
];

const bancos = [
    {
        value: 'Banco del Pichincha',
        label: 'Banco del Pichincha'
    },
    {
        value: 'Banco del Austro',
        label: 'Banco del Austro'
    },
    {
        value: 'Banco Internacional',
        label: 'Banco Internacional'
    },
];

// Modifica la declaración del tipo para incluir las propiedades de autoTable
declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => {
            previous: {
                finalY: number;
            };
        } & jsPDF;
    }
}

interface ExcelData {
    "ID Anticipo": string;
    "Colaborador": string;
    "Identificación": string;
    "Total a Debitar": string;
}


const PagosPendientes = () => {

    const location = useLocation();
    const { idPago, estadoPago } = location.state || {};

    const [idPagoNav, setIdPagoNav] = useState(idPago || 'id');
    const [estadoPagoNav, setEstadoPagoNav] = useState(estadoPago || false);

    const [isChecked, setIsChecked] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(pagosPendientes, 'idSolicitud'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState(false);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'idSolicitud', direction: 'asc' });

    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>('2022-07-05');

    // Estas son varibles fijas solo de meustra
    const idPagos: string = '01588';
    const corteDate: string= '20/12/2024';
    const pagoDate: string= '20/10/2025';
/////////////// Generar PDF////////////////////////////////////////////////////////

const generatePDF = () => {
    const doc = new jsPDF();

    // Imagen de logo
    const imageUrl = logoBonum;
    doc.addImage(imageUrl, 'PNG', 120, 10, 70, 40);

    // Título del documento
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("COMPROBANTE DE PAGO", 108, 58);

    // Detalles del Pago
    doc.setFont("times", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("ID PAGO", 140, 70);
    doc.text(idPagos, 177, 70);

    doc.setFont("times");
    doc.setTextColor(150, 150, 150);
    doc.text("FECHA DE CORTE:", 120, 80);
    doc.text(corteDate, 169, 80);

    doc.text("FECHA DE PAGO:", 122, 90);
    doc.text(pagoDate, 169, 90);

    // Configurar tabla con autoTable
    const headers = [["ID Anticipo", "Colaborador", "Identificación", "Total a Debitar"]];
    const data = pagosPendientes.map(row => [
        row.idAnticipo,
        row.nombre,
        row.identificacion,
        `$ ${row.totalDebitar.toFixed(2)}`
    ]);

    // Calcular el total a pagar sumando el campo `totalDebitar`
    const totalAPagar = pagosPendientes.reduce((acc, row) => acc + row.totalDebitar, 0);

    // Agregar una fila al final para el Total a Pagar
    data.push(["", "", "Total a Pagar", `$ ${totalAPagar.toFixed(2)}`]);

    // Generar la tabla con autoTable
    doc.autoTable({
        head: headers,
        body: data,
        startY: 100,
        styles: {
            fontSize: 10,
            halign: 'right', // Alineación de las celdas a la derecha
            valign: 'middle',
            cellPadding: 2, // Reducir el relleno dentro de las celdas
            textColor: [0, 0, 0],
            lineColor: [0, 0, 0], // Quitar los bordes internos
            lineWidth: 0
        },
        headStyles: {
            textColor: [0, 0, 0],
            fillColor: [255, 255, 255], // Quitar el fondo de los encabezados
            fontSize: 12,
            fontStyle: 'bold',
            halign: 'right', // Alineación de los encabezados a la derecha
        },
        margin: { top: 30, left: 20, right: 20, bottom: 20 },
        rowHeight: 8, // Reducir la altura de las filas
        columnStyles: {
            0: { cellWidth: 30 }, // Aumentar el tamaño de la columna del ID Anticipo
            1: { cellWidth: 'auto' }, // Ajuste automático del ancho para la columna de Nombre
            2: { cellWidth: 'auto' }, // Ajuste automático del ancho para la columna de Identificación
            3: { cellWidth: 40 } // Ajuste para la columna Total a Debitar
        },
        didDrawPage: (data:any) => {
            const finalY = data.cursor.y;
            doc.line(20, finalY + 10, 190, finalY + 10);
            doc.text("Generado por Bonum", 15, finalY + 20);
        },
    });

    // Guardar el archivo
    doc.save("pagos-pendientes.pdf");
};


/////////////////////////////////////////////////////////////////////////////////////

/////////////Generar Excel////////////////////////////////////////////////////////
const generateXLSX = (): void => {
    // Preparar los datos en el formato adecuado para Excel
    const headers: string[] = ["ID Anticipo", "Colaborador", "Identificación", "Total a Debitar"];

    // Convertir los datos de pagosPendientes al formato deseado
    const data: ExcelData[] = pagosPendientes.map(row => ({
        "ID Anticipo": row.idAnticipo,
        "Colaborador": row.nombre,
        "Identificación": row.identificacion,
        "Total a Debitar": `$ ${row.totalDebitar.toFixed(2)}`
    }));

    // Calcular el total
    const totalAPagar: number = pagosPendientes.reduce((acc, row) => acc + row.totalDebitar, 0);

    // Agregar una fila en blanco y el total
    data.push({
        "ID Anticipo": "",
        "Colaborador": "",
        "Identificación": "Total a Pagar",
        "Total a Debitar": `$ ${totalAPagar.toFixed(2)}`
    });

    // Crear una nueva hoja de trabajo
    const ws: WorkSheet = XLSX.utils.json_to_sheet(data, { header: headers });


    // Agregar información adicional al principio de la hoja
    XLSX.utils.sheet_add_aoa(ws, [
        ["COMPROBANTE DE PAGO"],
        [""],
        [`ID PAGO: ${idPagos}`],
        [`FECHA DE CORTE: ${corteDate}`],
        [`FECHA DE PAGO: ${pagoDate}`],
        [""]
    ], { origin: "E1" });

    // Crear un nuevo libro de trabajo
    const wb: WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pagos Pendientes");

    // Ajustar el ancho de las columnas
    const colWidths: { wch: number }[] = [
        { wch: 20 },  // ID Anticipo A
        { wch: 40 },  // Colaborador B
        { wch: 20 },  // Identificación C
        { wch: 20 },   // Total a Debitar D
        { wch: 30 }, // Columna E (para que se ensanche)
    ];
    ws["!cols"] = colWidths;

    // Guardar el archivo
    XLSX.writeFile(wb, "pagos-pendientes.xlsx");
};
/////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return pagosPendientes.filter((item) => {
                return (
                    item.idAnticipo.toString().includes(search.toLowerCase()) ||
                    item.nombre.toLowerCase().includes(search.toLowerCase()) ||
                    item.identificacion.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.fechaAnticipo.toLowerCase().includes(search.toLowerCase()) ||
                    item.anticipoActivo.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.cuota.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.saldo.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.valorCuota.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.tasaUnica.toString().toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const [hideCols, setHideCols] = useState<any>(['age', 'dob', 'isActive']);

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    const cols = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'firstName', title: 'First Name' },
        { accessor: 'lastName', title: 'Last Name' },
        { accessor: 'email', title: 'Email' },
        { accessor: 'phone', title: 'Phone' },
        { accessor: 'company', title: 'Company' },
        { accessor: 'address.street', title: 'Address' },
        { accessor: 'age', title: 'Age' },
        { accessor: 'dob', title: 'Birthdate' },
        { accessor: 'isActive', title: 'Active' },
    ];

    const [fileName, setFileName] = useState<string | null>(null); // Estado para el nombre del archivo

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            console.log(fileName)
        }
    };
    /// Estilos globales
    const fontStyles = {
        '--Fontfamilyfont-family': "'Maven Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        '--Fontsizefont-size-400': '14px',
    } as React.CSSProperties;

    return (
        <div style={fontStyles}>
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: window.screen.width * 0.01,
                width: '100%',
                //backgroundColor: 'blue',

                //padding: 5
            }}
        >
                <div
                    style={{
                        //backgroundColor: 'cyan',
                        //fontFamily: Nunito;
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        //padding: 15,
                        paddingTop: 15,
                        paddingLeft: 15,
                        paddingBottom: 15,
                        color: '#0E1726',
                        fontSize: 13,
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal'
                    }}
                >
                    <div
                    style={{
                        backgroundColor: 'white',
                        marginLeft: window.screen.width * 0.015,
                        width:'70%'

                    }}
                    >


                        <PagosPendientesTable
                            estadoPagoNav={estadoPagoNav}
                            isChecked={isChecked}
                            page={page}
                            pageSize={pageSize}
                            initialRecords={initialRecords}
                            pagosPendientes={pagosPendientes}
                            search={search}
                            searchData={searchData}
                            sortStatus={sortStatus}
                            hideCols={hideCols}
                            setIsChecked={setIsChecked}
                            setPage={setPage}
                            setPageSize={setPageSize}
                            setSearch={setSearch}
                            setSearchData={setSearchData}
                            setSortStatus={setSortStatus}
                            setHideCols={setHideCols}
                            PAGE_SIZES={PAGE_SIZES}
                        />

                    </div>

                            <div
                            style={{
                                backgroundColor: 'white',
                                width: '30%',
                                height: '80%',
                                marginLeft: window.screen.width * 0.02,
                                marginRight: window.screen.width * 0.01,
                                borderRadius: 12,
                                padding: '20px',
                                paddingBottom: '60px',
                                paddingTop: '60px',
                                border: '1px solid #C7C7CC',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                            >
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '15px'
                                }}>
                                    <h3 style={{
                                        width: 'auto',
                                        height: '28px',
                                        gap: 0,
                                        opacity: 1,
                                        fontFamily: 'var(--Fontfamilyfont-family)',
                                        fontSize: '25px',
                                        fontWeight: 700,
                                        lineHeight: '28.2px',
                                        textAlign: 'left',
                                        textUnderlinePosition: 'from-font',
                                        textDecorationSkipInk: 'none',
                                        color: '#0E1726',
                                        margin: 0
                                    }}>
                                        Liquidación #0001
                                    </h3>

                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',

                                        }}>
                                            <span style={{
                                                width: '71px',
                                                height: '21px',
                                                gap: 0,
                                                opacity: 1,
                                                fontFamily: 'var(--Fontfamilyfont-family)',
                                                fontSize: 'var(--Fontsizefont-size-400)',
                                                fontWeight: 400,
                                                lineHeight: '21.15px',
                                                textAlign: 'left',
                                                textUnderlinePosition: 'from-font',
                                                textDecorationSkipInk: 'none',
                                                color: '#3C3C4399'
                                            }}>Empresa:</span>
                                            <span style={{
                                                width: '90px',
                                                height: '21px',
                                                fontFamily: 'var(--Fontfamilyfont-family)',
                                                fontSize: 'var(--Fontsizefont-size-400)',
                                                fontWeight: 400,
                                                lineHeight: '21.15px',
                                                textAlign: 'right',
                                                color: '#0E1726'
                                            }}>Naturísimo</span>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <span style={{
                                                width: 'auto',
                                                height: '21px',
                                                gap: 0,
                                                opacity: 1,
                                                fontFamily: 'var(--Fontfamilyfont-family)',
                                                fontSize: 'var(--Fontsizefont-size-400)',
                                                fontWeight: 400,
                                                lineHeight: '21.15px',
                                                textAlign: 'left',
                                                textUnderlinePosition: 'from-font',
                                                textDecorationSkipInk: 'none',
                                                color: '#3C3C4399'
                                            }}>Fecha de corte:</span>
                                            <span style={{
                                                width: '103px',
                                                height: '21px',
                                                gap: 0,
                                                fontFamily: 'var(--Fontfamilyfont-family)',
                                                fontSize: 'var(--Fontsizefont-size-400)',
                                                fontWeight: 400,
                                                lineHeight: '21.15px',
                                                textAlign: 'right',
                                                color: '#0E1726'
                                            }}>12 Ene 2025</span>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <span style={{
                                                width: 'auto',
                                                height: '21px',
                                                gap: 0,
                                                opacity: 1,
                                                fontFamily: 'var(--Fontfamilyfont-family)',
                                                fontSize: 'var(--Fontsizefont-size-400)',
                                                fontWeight: 400,
                                                lineHeight: '21.15px',
                                                textAlign: 'left',
                                                textUnderlinePosition: 'from-font',
                                                textDecorationSkipInk: 'none',
                                                color: '#3C3C4399'
                                            }}>Fecha máxima de pago:</span>
                                            <span style={{
                                                width: '103px',
                                                height: '21px',
                                                gap: 0,
                                                fontFamily: 'var(--Fontfamilyfont-family)',
                                                fontSize: 'var(--Fontsizefont-size-400)',
                                                fontWeight: 400,
                                                lineHeight: '21.15px',
                                                textAlign: 'right',
                                                color: '#0E1726'
                                            }}>21 Ene 2025</span>
                                        </div>
                                    </div>

                                    <div style={{
                                        marginTop: '20px',
                                        borderTop: '1px solid #eee',
                                        paddingTop: '20px'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '10px'
                                        }}>
                                            <span style={{
                                                width: 'auto',
                                                height: '21px',
                                                gap: 0,
                                                opacity: 1,
                                                fontFamily: 'var(--Fontfamilyfont-family)',
                                                fontSize: 'var(--Fontsizefont-size-400)',
                                                fontWeight: 400,
                                                lineHeight: '21.15px',
                                                textAlign: 'left',
                                                textUnderlinePosition: 'from-font',
                                                textDecorationSkipInk: 'none',
                                                color: '#3C3C4399'
                                            }}>Total de anticipos:</span>
                                            <span style={{
                                                width: '73px',
                                                height: '21px',
                                                gap: 0,
                                                fontFamily: 'var(--Fontfamilyfont-family)',
                                                fontSize: 'var(--Fontsizefont-size-400)',
                                                fontWeight: 400,
                                                lineHeight: '21.15px',
                                                textAlign: 'right',
                                                color: '#0E1726'
                                            }}>$1157.98</span>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '20px'
                                        }}>
                                            <span style={{
                                                width: 'auto',
                                                height: '21px',
                                                gap: 0,
                                                fontFamily: 'var(--Fontfamilyfont-family)',
                                                fontSize: 'var(--Fontsizefont-size-400)',
                                                fontWeight: 400,
                                                lineHeight: '21.15px',
                                                textAlign: 'left',
                                                textUnderlinePosition: 'from-font',
                                                textDecorationSkipInk: 'none',
                                                color: '#3C3C4399'
                                            }}>Costo de servicio:</span>
                                            <span style={{
                                                width: '73px',
                                                height: '21px',
                                                gap: 0,
                                                fontFamily: 'var(--Fontfamilyfont-family)',
                                                fontSize: 'var(--Fontsizefont-size-400)',
                                                fontWeight: 400,
                                                lineHeight: '21.15px',
                                                textAlign: 'right',
                                                color: '#0E1726'
                                            }}>$200.00</span>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            borderTop: '1px solid #eee',
                                            paddingTop: '15px',
                                            fontWeight: 600
                                        }}>
                                            <span style={{
                                                width: 'auto',
                                                height: '24px',
                                                gap: 0,
                                                fontFamily: 'Inter',
                                                fontSize: '20px',
                                                fontWeight: 600,
                                                lineHeight: '24.2px',
                                                textAlign: 'left',
                                                textUnderlinePosition: 'from-font',
                                                textDecorationSkipInk: 'none',
                                                color: 'var(--Labels-Secondary, #3C3C4399)'
                                            }}>Total a transferir:</span>
                                            <span style={{
                                                width: '105px',
                                                height: '28px',
                                                fontFamily: 'var(--Fontfamilyfont-family)',
                                                fontSize: '20px',
                                                fontWeight: 700,
                                                lineHeight: '28.2px',
                                                textAlign: 'right',
                                                color: '#0E1726'
                                            }}>$1357.98</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                    </div>





        </div >
        </div>
    )

}

export default PagosPendientes;
