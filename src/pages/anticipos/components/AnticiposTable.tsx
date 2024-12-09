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

const AnticiposTable = ({
    isChecked,
    openModal,
    page,
    pageSize,
    initialRecords,
    solicitudesData,
    search,
    searchData,
    sortStatus,
    hideCols,
    setIsChecked,
    setOpenModal,
    setPage,
    setPageSize,
    setSearch,
    setSearchData,
    setSortStatus,
    setHideCols,
    PAGE_SIZES,
    setStateModal
}: {
    isChecked: boolean;
    openModal: boolean;
    page: number;
    pageSize: number;
    initialRecords: any[];
    solicitudesData: any[];
    search: string;
    searchData: boolean;
    sortStatus: DataTableSortStatus;
    hideCols: any;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setSearchData: React.Dispatch<React.SetStateAction<boolean>>;
    setSortStatus: React.Dispatch<React.SetStateAction<DataTableSortStatus>>;
    setHideCols: React.Dispatch<React.SetStateAction<any>>;
    PAGE_SIZES: any[],
    setStateModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    return (
        <div
            className="datatables"
            style={{
                marginTop: 12,
            }}
        >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} size="medium">
                    <TableHead sx={{  backgroundColor: '#e9efff' }}>
                        <TableRow>
                            <TableCell
                                align='left'
                                //size='small'
                                sx={{
                                   
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <p> ID Adelanto </p>
                            </TableCell>
                            <TableCell
                                align='left'
                                size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <p> Nombre </p>
                            </TableCell>
                            <TableCell
                                align='right'
                                size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <p> Sueldo </p>
                            </TableCell>
                            <TableCell
                                align='right'
                                size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <p> Monto Solicitado </p>
                            </TableCell>
                            <TableCell
                                align='left'
                                size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <p> Plazo </p>
                            </TableCell>
                            <TableCell
                                align='left'
                                size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <p> Fecha de Adelanto </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <p> Estado </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <p> Acciones </p>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {solicitudesData.map((row, index) => (
                            <TableRow key={row.idSolicitud} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell
                                    align='left'
                                    size='medium'
                                    sx={{
                                        color: '#BF5CF3',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        fontFamily: 'Maven Pro'
                                    }}
                                >
                                    <p> {row.idSolicitud} </p>
                                </TableCell>
                                <TableCell
                                    align='left'
                                    size='medium'
                                    sx={{
                                        
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        fontFamily: 'Maven Pro'
                                    }}
                                >
                                    <p> {row.nombre} </p>
                                </TableCell>
                                <TableCell
                                    align='right'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        fontFamily: 'Maven Pro'
                                    }}
                                >
                                    <p> {row.sueldo} </p>
                                </TableCell>
                                <TableCell
                                    align='right'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        fontFamily: 'Maven Pro'
                                    }}
                                >
                                    <p> {row.montoSolicitado} </p>
                                </TableCell>
                                <TableCell
                                    align='left'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        fontFamily: 'Maven Pro'
                                    }}
                                >
                                    <p> {row.plazo} </p>
                                </TableCell>
                                <TableCell
                                    align='left'
                                    size='medium'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        fontFamily: 'Maven Pro'
                                    }}
                                >
                                    <p> {row.antiguedad} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        justifyContent: 'center',
                                        justifyItems: 'center',
                                        alignContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >

                                    <div
                                        style={{
                                            width: '88.201px',
                                            height: '22px',
                                            flexShrink: 0,
                                            //height: window.screen.height * 0.04,
                                            backgroundColor: row.estado ? '#00AB55' : '#E7515A',
                                            color: 'white',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            borderRadius: 4,
                                            boxShadow: '4px 10px 15px 0px rgba(0, 0, 0, 0.12)',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            textAlign: 'center',
                                            fontFamily: 'Maven Pro',
                                        }}
                                    >
                                        {row.estado ? 'Aprobado' : 'Rechazado'}
                                    </div>
                                </TableCell>
                                <TableCell
                                    align='center'
                                >
                                    <button
                                        style={{
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            if (row.estado === true) {
                                                setOpenModal(true)
                                                setStateModal(true)
                                            }
                                            else {
                                                setOpenModal(true)
                                                setStateModal(false)
                                            }

                                        }}
                                    >
                                        <IconEye />
                                    </button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    gap: '2px',
                    paddingTop: 20,
                    paddingLeft: 20,
                    paddingBottom: 20
                }}
            >

                <div
                    style={{ width: '240px', marginRight: 9 }}
                >
                    <Typography
                        style={{
                            color: '#3B3F5C',
                            fontFamily: 'Nunito',
                            fontSize: 14,
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal'
                        }}
                    >
                        Mostrando {solicitudesData!.length} de {solicitudesData!.length} registros
                    </Typography>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <select
                        value={pageSize!}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        style={{
                            width: '70px',
                            height: '34px',
                            flexShrink: 0,
                            borderRadius: 6,
                            border: '1px solid #E0E6ED',
                            background: '#FFFFF',
                            paddingLeft: 13,
                            outline: 'none'
                        }}
                    >
                        {PAGE_SIZES!.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'right',
                        justifyContent: 'right',
                        gap: '5px',
                        paddingRight: 63
                    }}
                >
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        style={{
                            width: '36px',
                            height: '36px',
                            flexShrink: 0,
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            backgroundColor: page === 1 ? '#f5f5f5' : '#ffffff',
                            color: page === 1 ? '#ccc' : '#000',
                            cursor: page === 1 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M10.9375 11.375L6.5625 7L10.9375 2.625M7.4375 11.375L3.0625 7L7.4375 2.625" stroke="#3B3F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>

                    {[...Array(Math.ceil(solicitudesData!.length / pageSize)).keys()].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setPage(index + 1)}
                            style={{
                                width: '36px',
                                height: '36px',
                                flexShrink: 0,
                                border: '1px solid #ccc',
                                borderRadius: '50%',
                                backgroundColor: page === index + 1 ? '#BF5CF3' : '#f5f5f5',
                                color: page === index + 1 ? '#ffffff' : '#000',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: page === index + 1 ? 600 : 300,
                                fontFamily: 'Nunito',
                                fontSize: 14,
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        disabled={page * pageSize >= initialRecords!.length}
                        onClick={() => setPage(page + 1)}
                        style={{
                            width: '36px',
                            height: '36px',
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            backgroundColor: page * pageSize >= initialRecords!.length ? '#f5f5f5' : '#ffffff',
                            color: page * pageSize >= initialRecords!.length ? '#ccc' : '#000',
                            cursor: page * pageSize >= initialRecords!.length ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3.0625 11.375L7.4375 7L3.0625 2.625M6.5625 11.375L10.9375 7L6.5625 2.625" stroke="#3B3F5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )

}

export default AnticiposTable;