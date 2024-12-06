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

const HistorialEmpleadoTable = ({
    isChecked,
    page,
    pageSize,
    historialNewData,
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
    isChecked: boolean;
    page: number;
    pageSize: number;
    historialNewData: any[];
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

    return (
        <div
            className="datatables"
            style={{
                margin: '2vh'
            }}
        >
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    width: '14%',
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                    //backgroundColor: 'red'
                                }}
                            >
                                <p> Codigo </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <p> Nombre </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <p> Monto </p>
                            </TableCell>


                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    fontFamily: 'Maven Pro',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Plazo </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    fontFamily: 'Maven Pro',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Costo por Servicio </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    fontFamily: 'Maven Pro',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Fecha de Solicitud  </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                //size='small'
                                sx={{
                                    color: '#0E1726',
                                    fontSize: 13,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    fontFamily: 'Maven Pro',
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Fecha de Finalización </p>
                            </TableCell>
                           
                            {/* <TableCell
                            align='center'
                            size='small'
                        >
                            <p> Estado </p>
                        </TableCell> */}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {historialNewData.map((row, index) => (
                            <TableRow key={row.idAnticipo}>
                                <TableCell
                                    align='center'
                                    size='medium'
                                    sx={{
                                        width: '10%',
                                        color: '#BF5CF3',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: '600',
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.codigo} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='small'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.nombre} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='small'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.monto} </p>
                                </TableCell>


                                <TableCell
                                    align='center'
                                    size='small'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.plazo} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='small'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.costoPorServicio} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='small'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.fechaSolicitud} </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    size='small'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> {row.fechaFinalizacion} </p>
                                </TableCell>
            
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>


    )

}

export default HistorialEmpleadoTable;