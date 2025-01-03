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
import { Paper } from '@mantine/core';
import IconEye from '../../../components/Icon/IconEye';
import { NavLink } from 'react-router-dom';

// Definición de variables globales de estilo
const tableHeaderStyles = {
    width: '114.82px',
    height: '16px',
    color: '#0E1726',
    fontFamily: "'Maven Pro', 'Assistant', sans-serif",
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: '16.45px',
    textAlign: 'left',
    textUnderlinePosition: 'from-font',
    textDecorationSkipInk: 'none',
    padding: '12px 16px'
} as const;

const PagosPendientesTable = ({
    estadoPagoNav,
    isChecked,
    page,
    pageSize,
    initialRecords,
    pagosPendientes,
    search,
    searchData,
    sortStatus,
    hideCols,
    setIsChecked,
    setPage,
    setPageSize,
    setSearch,
    setSearchData,
    setSortStatus,
    setHideCols,
    PAGE_SIZES
}: {
    estadoPagoNav: boolean;
    isChecked: boolean;
    page: number;
    pageSize: number;
    initialRecords: any[];
    pagosPendientes: any[];
    search: string;
    searchData: boolean;
    sortStatus: DataTableSortStatus;
    hideCols: any;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setSearchData: React.Dispatch<React.SetStateAction<boolean>>;
    setSortStatus: React.Dispatch<React.SetStateAction<DataTableSortStatus>>;
    setHideCols: React.Dispatch<React.SetStateAction<any>>;
    PAGE_SIZES: any[];
}) => {

    // Cálculo de registros para paginación
    const paginatedData = pagosPendientes.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="datatables">
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead
                        sx={{
                            backgroundColor: 'rgba(196, 211, 255, 0.3)',
                            borderBottom: '1px solid #e0e0e0'
                        }}
                    >
                        <TableRow>
                            <TableCell align='left' sx={tableHeaderStyles}>
                                <p>ID de transacción</p>
                            </TableCell>
                            <TableCell align='left' sx={tableHeaderStyles}>
                                <p>Colaborador</p>
                            </TableCell>
                            <TableCell align='left' sx={tableHeaderStyles}>
                                <p>Identificación</p>
                            </TableCell>
                            <TableCell align='left' sx={tableHeaderStyles}>
                                <p>Saldo</p>
                            </TableCell>
                            <TableCell align='left' sx={tableHeaderStyles}>
                                <p>Valor Cuota</p>
                            </TableCell>
                            <TableCell align='left' sx={tableHeaderStyles}>
                                <p>Costo por Servicio</p>
                            </TableCell>
                            <TableCell align='left' sx={tableHeaderStyles}>
                                <p>Total a debitar</p>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row) => (
                            <TableRow
                                key={row.idAnticipo}
                                sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                            >
                                <TableCell
                                    sx={{
                                        color: '#BF5CF3',
                                        fontSize: 13,
                                        padding: '12px 16px'
                                    }}
                                >
                                    #{row.idAnticipo}
                                </TableCell>
                                <TableCell sx={{ fontSize: 13 }}>{row.nombre}</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>{row.identificacion}</TableCell>
                                <TableCell align='left' sx={{ fontSize: 13 }}>$ {row.saldo.toFixed(2)}</TableCell>
                                <TableCell align='left' sx={{ fontSize: 13 }}>$ {row.valorCuota.toFixed(2)}</TableCell>
                                <TableCell align='left' sx={{ fontSize: 13 }}>$ {row.tasaUnica.toFixed(2)}</TableCell>
                                <TableCell align='left' sx={{ fontSize: 13 }}>$ {row.totalDebitar.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
                <div style={{ fontSize: 13 }}>
                    Mostrando {paginatedData.length} de {initialRecords.length} registros
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPage(1);
                        }}
                        style={{ marginLeft: '16px', padding: '4px 8px', border: '1px solid #e0e0e0', borderRadius: '6px',height: '40px' }}
                    >
                        {PAGE_SIZES.map((size) => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        style={{
                            margin: '8px',
                            padding: '8px 8px',
                            border: '1px solid #F1F1F1',
                            borderRadius: '50%',
                            background: page === 1 ? '#FFFFFF' : '#fff'
                        }}
                    >
                      {'<<'}
                    </button>

                    <span
                        style={{
                            margin: '8px',
                            width: '35px', // Ajusta según el tamaño deseado
                            height: '35px', // Igual que el ancho
                            display: 'flex', // Para centrar contenido
                            justifyContent: 'center', // Centrado horizontal
                            alignItems: 'center', // Centrado vertical
                            border: '1px solid #FFFFFF',
                            borderRadius: '50%',
                            background: page * pageSize >= pagosPendientes.length ? '#E9EFFF' : '#E9EFFF'
                        }}
                        >
                        {page}
                    </span>


                    <button
                        onClick={() => setPage((prev) => (page * pageSize < pagosPendientes.length ? prev + 1 : prev))}
                        disabled={page * pageSize >= pagosPendientes.length}
                        style={{
                            margin: '8px',
                            padding: '8px 8px',
                            border: '1px solid #F1F1F1',
                            borderRadius: '50%',
                            background: page * pageSize >= pagosPendientes.length ? '#FFFFFF' : '#fff'
                        }}
                    >
                        {'>>'}
                    </button>


                </div>
            </div>
        </div>
    )
}

export default PagosPendientesTable;
